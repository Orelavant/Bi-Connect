import { ApolloError } from "apollo-server-errors";
import {
	BoardModel,
	CommentModel,
	PostModel,
	UserModel,
} from "../schema/models";
import { Context } from "../types/context";
import dotenv from "dotenv";
import {
	BoardIdInput,
	CreateBoardInput,
	GetBoardsInput,
	UpdateBoardInput,
} from "../inputs/board.inputs";
import { UserIdInput } from "../inputs/user.inputs";
import { types } from "@typegoose/typegoose";
import { Board } from "../schema/board.schema";
import { Post } from "../schema/post.schema";
dotenv.config();

export default class BoardService {
	async createBoard(userDetails: UserIdInput, input: CreateBoardInput) {
		if (Object.keys(userDetails).length === 0) {
			throw new ApolloError("User details not provided");
		}
		try {
			await UserModel.findOne(userDetails).lean();
		} catch {
			throw new ApolloError("Error finding user or db error");
		}
		try {
			await BoardModel.findOne({ name: input.name }).lean();
		} catch {
			throw new ApolloError("Error checking for existing board or db error");
		}
		try {
			const board = await BoardModel.create({
				...input,
				usersCount: 1,
			});
			return board;
		} catch {
			throw new ApolloError("db error creating board");
		}
	}

	async updateBoard(boardDetails: BoardIdInput, input: UpdateBoardInput) {
		if (Object.keys(input).length === 0) {
			throw new ApolloError("No board update fields provided");
		}
		try {
			const updatedBoard = await BoardModel.findOneAndUpdate(
				boardDetails,
				input,
				{
					new: true,
				}
			).lean();
			return updatedBoard;
		} catch {
			throw new ApolloError("db error updating board");
		}
	}

	async getBoard(input: BoardIdInput) {
		try {
			const board = await BoardModel.findOne(input).lean();
			return board;
		} catch {
			throw new ApolloError("db error finding board");
		}
	}

	async getBoards(input: GetBoardsInput) {
		const {
			nameStartsWith,
			nameEndsWith,
			nameContains,
			descriptionStartsWith,
			descriptionEndsWith,
			descriptionContains,
			usersCountLte,
			usersCountGte,
			isRemoved,
			createdAtBefore,
			createdAtAfter,
			updatedAtBefore,
			updatedAtAfter,
			limit,
			offset,
		} = input;
		const filterQuery = {
			$and: [
				nameStartsWith && {
					name: new RegExp(`^${nameStartsWith}`, "i"),
				},
				nameEndsWith && {
					name: new RegExp(`${nameEndsWith}$`, "i"),
				},
				nameContains && { name: new RegExp(`^.*${nameContains}.*$`, "i") },
				descriptionStartsWith && {
					description: new RegExp(`^${descriptionStartsWith}`, "i"),
				},
				descriptionEndsWith && {
					description: new RegExp(`${descriptionEndsWith}$`, "i"),
				},
				descriptionContains && {
					description: new RegExp(`^.*${descriptionContains}.*$`, "i"),
				},
				usersCountLte != null && {
					usersCountLte: {
						$lte: usersCountLte,
					},
				},
				usersCountGte != null && {
					usersCountGte: {
						$gte: usersCountGte,
					},
				},
				isRemoved != null && { removed: isRemoved },
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
			const boards = await BoardModel.find(filterQuery)
				.sort({ name: 1 })
				.skip(offset)
				.limit(limit)
				.lean();
			return boards;
		} catch {
			throw new ApolloError("db error finding boards");
		}
	}

	async removeBoard(input: BoardIdInput) {
		try {
			const board = await BoardModel.findOneAndUpdate(
				input,
				{ removed: true },
				{ new: true }
			).lean();
			return board;
		} catch {
			throw new ApolloError("db error removing board");
		}
	}

	async restoreBoard(input: BoardIdInput) {
		try {
			const board = await BoardModel.findOneAndUpdate(
				input,
				{ removed: false },
				{ new: true }
			);
			return board;
		} catch {
			throw new ApolloError("db error restoring board");
		}
	}

	async deleteBoard(boardDetails: BoardIdInput) {
		let deletedBoard: types.DocumentType<Board>;
		try {
			deletedBoard = await BoardModel.findOneAndDelete(boardDetails);
		} catch {
			throw new ApolloError("db error deleting board");
		}
		// CASCADE ON POSTS, COMMENTS AND USERS
		let boardPosts: types.DocumentType<Post>[];
		// delete all posts in this board
		try {
			boardPosts = await PostModel.find(
				{
					boardName: deletedBoard.name,
				},
				{ _id: 1 }
			).lean();
			await PostModel.deleteMany({
				boardName: deletedBoard.name,
			});
		} catch {
			throw new ApolloError("db error deleting posts in board");
		}
		// delete all comments in this board
		try {
			const boardPostsIds = boardPosts.map(({ _id }) => _id);
			await CommentModel.deleteMany({
				_id: {
					$in: boardPostsIds,
				},
			}).lean();
		} catch {
			throw new ApolloError("db error deleting comments in posts in board");
		}
		try {
			await UserModel.updateMany(
				{ followedBoardsNames: [deletedBoard.name] },
				{ $pull: { followedBoardNames: deletedBoard.name } }
			).lean();
		} catch {
			throw new ApolloError(
				"db error deleting board from users's followed boards"
			);
		}
		return deletedBoard;
	}
}
