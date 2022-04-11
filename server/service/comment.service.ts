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
	CommentsIdsInput,
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
			user = await UserModel.findOne(userDetails);
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
			creatorName,
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
		const andFilter = [
			contentStartsWith && {
				content: new RegExp(`^${contentStartsWith}`, "i"),
			},
			contentEndsWith && {
				content: new RegExp(`${contentEndsWith}$`, "i"),
			},
			contentContains && {
				content: new RegExp(`^.*${contentContains}.*$`, "i"),
			},
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

	async removeComments(commentsDetails: CommentsIdsInput) {
		try {
			const deletedComment = await CommentModel.updateMany(
				{ _id: { $in: commentsDetails._ids } },
				{ removed: true },
				{ new: true }
			).lean();
			return deletedComment;
		} catch {
			throw new ApolloError("db error removing comments");
		}
	}

	async restoreComment(commentDetails: CommentIdInput) {
		try {
			const restoredComment = await CommentModel.findByIdAndUpdate(
				commentDetails._id,
				{ removed: false },
				{ new: true }
			).lean();
			return restoredComment;
		} catch {
			throw new ApolloError("db error restoring comment");
		}
	}

	async restoreComments(commentsDetails: CommentsIdsInput) {
		try {
			const restoredComments = await CommentModel.updateMany(
				{ _id: { $in: commentsDetails._ids } },
				{ removed: true },
				{ new: true }
			).lean();
			return restoredComments;
		} catch {
			throw new ApolloError("db error restoring comments");
		}
	}

	async deleteComment(commentDetails: CommentIdInput) {
		let deletedComment;
		try {
			deletedComment = await CommentModel.findOneAndDelete(
				commentDetails
			).lean();
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

	async deleteComments(commentsDetails: CommentsIdsInput) {
		try {
			const deletedComments = await CommentModel.find({
				_id: { $in: commentsDetails._ids },
			}).lean();
			await CommentModel.deleteMany({
				_id: { $in: commentsDetails._ids },
			}).lean();
			return deletedComments;
		} catch {
			throw new ApolloError("db error deleting comments");
		}
	}
}
