import { ApolloError } from "apollo-server-errors";
import { BoardModel, UserModel } from "../schema/models";
import { Context } from "../types/context";
import dotenv from "dotenv";
import {
	BoardIdInput,
	CreateBoardInput,
	GetBoardsInput,
	UpdateBoardInput,
} from "../inputs/board.inputs";
import { UserIdInput } from "../inputs/user.inputs";
dotenv.config();

export default class BoardService {
	async createBoard(userDetails: UserIdInput, input: CreateBoardInput) {
		const user = await UserModel.findOne(userDetails);
		if (!user) {
			throw new ApolloError("Error finding board creator user");
		}
		const board = await BoardModel.create({
			...input,
			usersCount: 1,
			users: [user],
			moderators: [user],
		});
		return board;
	}

	async updateBoard(boardDetails: BoardIdInput, input: UpdateBoardInput) {
		const updatedBoard = await BoardModel.findOneAndUpdate(
			boardDetails,
			input,
			{
				new: true,
			}
		);
		return updatedBoard;
	}

	async getBoard(input: BoardIdInput) {
		const board = await BoardModel.findOne(input);
		return board;
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
		const boards = await BoardModel.find(filterQuery)
			.sort({ name: 1 })
			.skip(offset)
			.limit(limit);
		return boards;
	}

	async deleteBoard(boardDetails: BoardIdInput) {
		const deletedBoard = await BoardModel.deleteOne(boardDetails);
		return deletedBoard;
	}
}
