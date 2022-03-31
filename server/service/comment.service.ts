import { ApolloError } from "apollo-server-errors";
import { CommentModel, PostModel, UserModel } from "../schema/models";
import { Context } from "../types/context";
import dotenv from "dotenv";
import { UserIdInput } from "../inputs/user.inputs";
import { BoardIdInput } from "../inputs/board.inputs";
import {
	CreateCommentInput,
	CommentIdInput,
	UpdateCommentInput,
	GetCommentsInput,
} from "../inputs/comments.inputs";
import { PostIdInput } from "../inputs/post.inputs";
dotenv.config();

export default class CommentService {
	async createComment(
		userDetails: UserIdInput,
		postDetails: PostIdInput,
		input: CreateCommentInput
	) {
		let user;
		try {
			user = await UserModel.findOne(userDetails, {
				username: 1,
			});
		} catch {
			throw new ApolloError("User does not exist or db error");
		}
		let postId;
		try {
			({ _id: postId } = await PostModel.findOne(postDetails, {
				_id: 1,
			}).lean());
		} catch {
			throw new ApolloError("Post does not exist or db error");
		}
		let comment;
		try {
			comment = await CommentModel.create({
				...input,
				creatorName: user.username,
				postId,
			});
		} catch {
			throw new ApolloError("db error creating comment");
		}
		try {
			user.commentsIds.push(comment._id);
			await user.save();
		} catch {
			throw new ApolloError("db error while adding comment to user");
		}
		return comment;
	}

	async updateComment(
		commentDetails: CommentIdInput,
		input: UpdateCommentInput
	) {
		try {
			const updatedComment = await CommentModel.findOneAndUpdate(
				commentDetails,
				input,
				{
					new: true,
				}
			).lean();
			return updatedComment;
		} catch {
			throw new ApolloError("db error updating comment");
		}
	}

	async getComment(input: CommentIdInput) {
		try {
			const comment = await CommentModel.findOne(input).lean();
			return comment;
		} catch {
			throw new ApolloError("db error getting comment");
		}
	}

	async getComments(input: GetCommentsInput) {
		const {
			contentStartsWith,
			contentEndsWith,
			contentContains,
			creatorNameStartsWith,
			creatorNameEndsWith,
			creatorNameContains,
			likesLte,
			likesGte,
			dislikesLte,
			dislikesGte,
			createdAtBefore,
			createdAtAfter,
			updatedAtBefore,
			updatedAtAfter,
			limit,
			offset,
		} = input;
		const filterQuery = {
			$and: [
				contentStartsWith && {
					conent: new RegExp(`^${contentStartsWith}`, "i"),
				},
				contentEndsWith && {
					content: new RegExp(`${contentEndsWith}$`, "i"),
				},
				contentContains && {
					content: new RegExp(`^.*${contentContains}.*$`, "i"),
				},
				creatorNameStartsWith && {
					user: {
						username: new RegExp(`^${creatorNameStartsWith}`, "i"),
					},
				},
				creatorNameEndsWith && {
					user: {
						username: new RegExp(`${creatorNameEndsWith}$`, "i"),
					},
				},
				creatorNameContains && {
					user: {
						username: new RegExp(`^.*${creatorNameContains}.*$`, "i"),
					},
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
		try {
			const comments = await CommentModel.find(filterQuery)
				.sort({ updatedAt: -1 })
				.skip(offset)
				.limit(limit)
				.lean();
			return comments;
		} catch {
			throw new ApolloError("db error getting comments");
		}
	}

	async removeComment(commentDetails: CommentIdInput) {
		try {
			const deletedComment = await CommentModel.findOneAndUpdate(
				commentDetails,
				{ removed: true },
				{ new: true }
			).lean();
			return deletedComment;
		} catch {
			throw new ApolloError("db error removing comment");
		}
	}

	async restoreComment(commentDetails: CommentIdInput) {
		try {
			const deletedComment = await CommentModel.findOneAndUpdate(
				commentDetails,
				{ removed: false },
				{ new: true }
			).lean();
			return deletedComment;
		} catch {
			throw new ApolloError("db error restoring comment");
		}
	}

	async deleteComment(commentDetails: CommentIdInput) {
		let deletedComment;
		try {
			deletedComment = await CommentModel.deleteOne(commentDetails).lean();
		} catch {
			throw new ApolloError("db error deleting comment");
		}
		try {
			const { creatorName } = deletedComment;
			await UserModel.findOneAndUpdate(
				{ username: creatorName },
				{
					$pullAll: {
						commentsIds: deletedComment._id,
					},
				}
			).lean();
		} catch {
			throw new ApolloError("db error while deleting post from user");
		}
		return deletedComment;
	}
}
