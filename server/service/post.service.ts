import { ApolloError } from "apollo-server-errors";
import {
	BoardModel,
	CommentModel,
	PostModel,
	UserModel,
} from "../schema/models";
import { UserIdInput } from "../inputs/user.inputs";
import {
	CreatePostInput,
	GetPostsInput,
	PostIdInput,
	PostsFilterInput,
	PostsIdsInput,
	UpdatePostInput,
} from "../inputs/post.inputs";
import { BoardIdInput } from "../inputs/board.inputs";
import { User } from "../schema/user.schema";
import { types } from "@typegoose/typegoose";
import { Board } from "../schema/board.schema";
import { Post } from "../schema/post.schema";

export default class PostService {
	async createPost(
		creatorDetails: UserIdInput,
		boardDetails: BoardIdInput,
		input: CreatePostInput
	) {
		if (Object.keys(creatorDetails).length === 0) {
			throw new ApolloError("User details not provided");
		}
		let user: types.DocumentType<User>;
		try {
			user = await UserModel.findOne(creatorDetails);
		} catch {
			throw new ApolloError("User does not exist or db error");
		}
		let board: types.DocumentType<Board>;
		try {
			board = await BoardModel.findOne(boardDetails, { name: 1 });
		} catch {
			throw new ApolloError("Board does not exist or db error");
		}
		let post: types.DocumentType<Post>;
		try {
			post = await PostModel.create({
				...input,
				creatorName: user.username,
				boardName: board.name,
			});
		} catch {
			throw new ApolloError("db error while creating post");
		}
		try {
			user.postsIds.push(post._id);
			await user.save();
		} catch {
			throw new ApolloError("db error while adding post to user");
		}
		return post;
	}

	async updatePost(postDetails: PostIdInput, input: UpdatePostInput) {
		try {
			const updatedPost = await PostModel.findByIdAndUpdate(
				postDetails._id,
				input,
				{
					new: true,
				}
			).lean();
			return updatedPost;
		} catch {
			throw new ApolloError("db error while updating post");
		}
	}

	async getPost(input: PostIdInput) {
		try {
			const post = await PostModel.findById(input._id).lean();
			return post;
		} catch {
			throw new ApolloError("db error while findin post");
		}
	}

	async getPosts(input: GetPostsInput) {
		const {
			creatorName,
			creatorNameStartsWith,
			creatorNameEndsWith,
			creatorNameContains,
			titleStartsWith,
			titleEndsWith,
			titleContains,
			contentStartsWith,
			contentEndsWith,
			contentContains,
			boardNameStartsWith,
			boardNameEndsWith,
			boardNameContains,
			likesGte,
			likesLte,
			dislikesGte,
			dislikesLte,
			createdAtBefore,
			createdAtAfter,
			updatedAtBefore,
			updatedAtAfter,
			limit,
			offset,
		} = input;
		const andFilter = [
			creatorName && {
				creatorName,
			},
			creatorNameStartsWith && {
				creatorName: new RegExp(`^${creatorNameStartsWith}`, "i"),
			},
			creatorNameEndsWith && {
				creatorName: new RegExp(`${creatorNameEndsWith}$`, "i"),
			},
			creatorNameContains && {
				creatorName: {
					creatorName: new RegExp(`^.*${creatorNameContains}.*$`, "i"),
				},
			},
			titleStartsWith && {
				title: new RegExp(`^${titleStartsWith}`, "i"),
			},
			titleEndsWith && {
				title: new RegExp(`${titleEndsWith}$`, "i"),
			},
			titleContains && { title: new RegExp(`^.*${titleContains}.*`, "i") },
			contentStartsWith && {
				content: new RegExp(`^${contentStartsWith}`, "i"),
			},
			contentEndsWith && { content: new RegExp(`${contentEndsWith}$`, "i") },
			contentContains && {
				content: new RegExp(`^.*${contentContains}.*$`, "i"),
			},
			boardNameStartsWith && {
				boardName: new RegExp(`^${boardNameStartsWith}`, "i"),
			},
			boardNameEndsWith && {
				boardName: new RegExp(`${boardNameEndsWith}$`, "i"),
			},
			boardNameContains && {
				boardName: new RegExp(`^.*${boardNameContains}.*$`, "i"),
			},
			likesLte != null && {
				likes: {
					$lte: likesLte,
				},
			},
			likesGte != null && {
				likes: {
					$gte: likesGte,
				},
			},
			dislikesLte != null && {
				dislikes: {
					$lte: dislikesLte,
				},
			},
			dislikesGte != null && {
				dislikes: {
					$gte: dislikesGte,
				},
			},
			createdAtBefore && {
				createdAt: { $lte: createdAtBefore },
			},
			createdAtAfter && {
				createdAt: { $gte: createdAtAfter },
			},
			updatedAtBefore && {
				updatedAt: { $lte: updatedAtBefore },
			},
			updatedAtAfter && {
				updatedAt: { $gte: updatedAtAfter },
			},
		].filter(Boolean);
		const filterQuery = andFilter.length
			? {
					$and: andFilter,
			  }
			: {};
		try {
			const posts = await PostModel.find(filterQuery)
				.sort({ updatedAt: -1 })
				.skip(offset)
				.limit(limit)
				.lean();
			return posts;
		} catch {
			throw new ApolloError("db error finding posts");
		}
	}

	async removePost(input: PostIdInput) {
		try {
			const removedPost = await PostModel.findByIdAndUpdate(
				input._id,
				{ removed: true },
				{ new: true }
			).lean();
			return removedPost;
		} catch {
			throw new ApolloError("db error removing post");
		}
	}

	async removePosts(input: PostsIdsInput) {
		try {
			const removedPosts = await PostModel.updateMany(
				{ _id: { $in: input._ids } },
				{ removed: true },
				{ new: true }
			).lean();
			return removedPosts;
		} catch {
			throw new ApolloError("db error removing posts");
		}
	}

	async restorePost(input: PostIdInput) {
		try {
			const restoredPost = await PostModel.findByIdAndUpdate(
				input._id,
				{ removed: false },
				{ new: true }
			).lean();
			return restoredPost;
		} catch {
			throw new ApolloError("db error restoring post");
		}
	}

	async restorePosts(input: PostsIdsInput) {
		try {
			const restoredPosts = await PostModel.updateMany(
				{ _id: { $in: input._ids } },
				{ removed: false },
				{ new: true }
			).lean();
			return restoredPosts;
		} catch {
			throw new ApolloError("db error restoring posts");
		}
	}

	async deletePost(input: PostIdInput) {
		try {
			const deletedPost = await PostModel.findByIdAndDelete(input._id).lean();
			return deletedPost;
		} catch {
			throw new ApolloError("db error deleting post");
		}
	}

	async deletePosts(input: PostsIdsInput) {
		try {
			const deletedPosts = await PostModel.find({ _id: { $in: input._ids } });
			await PostModel.deleteMany({
				_id: { $in: input._ids },
			}).lean();
			return deletedPosts;
		} catch {
			throw new ApolloError("db error deleting posts");
		}
	}

	async getPostComments(input: PostIdInput) {
		try {
			const postComments = await CommentModel.find({ postId: input._id });
			return postComments;
		} catch {
			throw new ApolloError("db error getting post's comments");
		}
	}
}
