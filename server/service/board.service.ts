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
	BoardsIdsInput,
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
			await UserModel.findOneAndUpdate(userDetails, {
				$push: { followedBoardsNames: input.name },
			}).lean();
		} catch (err) {
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
		const andFilters = [
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
		].filter(Boolean);
		const filterQuery = andFilters.length
			? {
					$and: andFilters,
			  }
			: {};
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

	async removeBoards(input: BoardsIdsInput) {
		try {
			const restoredBoards = await BoardModel.updateMany(
				{ name: { $in: input.names } },
				{ removed: true },
				{ new: true }
			);
			return restoredBoards;
		} catch {
			throw new ApolloError("db error removing boards");
		}
	}

	async restoreBoard(input: BoardIdInput) {
		try {
			const restoredBoard = await BoardModel.findOneAndUpdate(
				input,
				{ removed: false },
				{ new: true }
			);
			return restoredBoard;
		} catch {
			throw new ApolloError("db error restoring board");
		}
	}

	async restoreBoards(input: BoardsIdsInput) {
		try {
			const restoredBoards = await BoardModel.updateMany(
				{ name: { $in: input.names } },
				{ removed: false },
				{ new: true }
			);
			// need to cascade on board posts and comments
			return restoredBoards;
		} catch {
			throw new ApolloError("db error restoring boards");
		}
	}

	async deleteBoard(input: BoardIdInput) {
		try {
			const deletedBoard = await BoardModel.findOneAndDelete(input);
			return deletedBoard;
		} catch {
			throw new ApolloError("db error deleting board");
		}
	}

	async deleteBoards(input: BoardsIdsInput) {
		try {
			const deletedBoards = await BoardModel.find({
				name: { $in: input.names },
			});
			await BoardModel.deleteMany({
				name: { $in: input.names },
			});
			return deletedBoards;
		} catch {
			throw new ApolloError("db error deleting boards");
		}
	}

	async getBoardPosts(input: BoardIdInput) {
		try {
			const boardPosts = await PostModel.find({ boardName: input.name });
			return boardPosts;
		} catch {
			throw new ApolloError("db error getting board's posts");
		}
	}
}
