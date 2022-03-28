import { ApolloError } from "apollo-server-errors";
import { BoardModel, PostModel, UserModel } from "../schema/models";
import {
	CreateUserInput,
	LoginInput,
	UserIdInput,
	UpdateUserInput,
	GetUsersInput,
} from "../inputs/user.inputs";
import {
	CreatePostInput,
	GetPostsInput,
	PostIdInput,
	UpdatePostInput,
} from "../inputs/post.inputs";
import { BoardIdInput } from "../inputs/board.inputs";

export default class PostService {
	async createPost(
		creatorDetails: UserIdInput,
		boardDetails: BoardIdInput,
		input: CreatePostInput
	) {
		if (Object.keys(creatorDetails).length === 0) {
			throw new ApolloError("User details not provided");
		}
		const user = await UserModel.findOne(creatorDetails);
		if (!user) {
			throw new ApolloError("User does not exist");
		}
		const board = await BoardModel.findOne(boardDetails);
		if (!board) {
			throw new ApolloError("Board does not exist");
		}
		const post = await PostModel.create({
			...input,
			creatorName: user.username,
			boardName: boardDetails.name,
		});
		return post;
	}

	async updatePost(postDetails: PostIdInput, input: UpdatePostInput) {
		const updatedPost = await PostModel.findOneAndUpdate(postDetails, input, {
			new: true,
		});
		return updatedPost;
	}

	async getPost(input: PostIdInput) {
		const post = await PostModel.findOne(input);
		return post;
	}

	async getPosts(input: GetPostsInput) {
		const {
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
		const filterQuery = {
			$and: [
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
			].filter(Boolean),
		};
		const posts = await PostModel.find(filterQuery)
			.sort({ updatedAt: -1 })
			.skip(offset)
			.limit(limit);
		return posts;
	}

	async removePost(input: PostIdInput) {
		const post = await PostModel.findOneAndUpdate(
			input,
			{ removed: true },
			{ new: true }
		);
		return post;
	}

	async restorePost(input: PostIdInput) {
		const post = await PostModel.findOneAndUpdate(
			input,
			{ removed: false },
			{ new: true }
		);
		return post;
	}

	async deletePost(input: PostIdInput) {
		const post = await PostModel.deleteOne(input);
		return post;
	}
}
