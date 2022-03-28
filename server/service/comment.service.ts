import { ApolloError } from "apollo-server-errors";
import {
	BoardModel,
	CommentModel,
	PostModel,
	UserModel,
} from "../schema/models";
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
		boardDetails: BoardIdInput,
		postDetails: PostIdInput,
		input: CreateCommentInput
	) {
		const user = await UserModel.findOne(userDetails);
		if (!user) {
			throw new ApolloError("Error finding user of comment");
		}
		const post = await PostModel.findOne(postDetails).lean();
		if (!post) {
			throw new ApolloError("Error finding post of comment");
		}
		const board = await BoardModel.findOne(boardDetails).lean();
		if (!board) {
			throw new ApolloError("Error finding board of post for comment");
		}
		const comment = await CommentModel.create({ ...input, user });
		return board;
	}

	async updateComment(
		commentDetails: CommentIdInput,
		input: UpdateCommentInput
	) {
		const updatedComment = await CommentModel.findOneAndUpdate(
			commentDetails,
			input,
			{
				new: true,
			}
		);
		return updatedComment;
	}

	async getComment(input: CommentIdInput) {
		const comment = await CommentModel.findOne(input);
		return comment;
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
		const comments = await CommentModel.find(filterQuery)
			.sort({ updatedAt: -1 })
			.skip(offset)
			.limit(limit);
		return comments;
	}

	async removeComment(commentDetails: CommentIdInput) {
		const deletedComment = await CommentModel.findOneAndUpdate(
			commentDetails,
			{ removed: true },
			{ new: true }
		);
		return deletedComment;
	}

	async restoreComment(commentDetails: CommentIdInput) {
		const deletedComment = await CommentModel.findOneAndUpdate(
			commentDetails,
			{ removed: false },
			{ new: true }
		);
		return deletedComment;
	}

	async deleteComment(commentDetails: CommentIdInput) {
		const deletedComment = await CommentModel.deleteOne(commentDetails);
		return deletedComment;
	}
}
