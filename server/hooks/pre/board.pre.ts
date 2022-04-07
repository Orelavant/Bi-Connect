import { ApolloError } from "apollo-server-errors";
import { BoardModel, PostModel, UserModel } from "../../schema/models";

export const boardPreDelete = async (filter) => {
	// CASCADE on users' followed boards and posts
	try {
		const boardsToBeDeleted = await BoardModel.find(filter, {
			name: 1,
		}).exec();
		// .lean();
		const boardsToBeDeletedNames = boardsToBeDeleted.map(({ name }) => name);
		await deleteBoardFromUsers(boardsToBeDeletedNames);
		await deleteBoardPosts(boardsToBeDeletedNames);
	} catch (err) {
		throw err;
	}
};

export const deleteBoardFromUsers = async (boardsNames: string[]) => {
	try {
		await UserModel.updateMany(null, {
			followedBoardsNames: {
				$pullAll: boardsNames,
			},
		}).lean();
	} catch {
		throw new ApolloError(
			"db error cascading deleting on user's followed boards"
		);
	}
};

export const deleteBoardPosts = async (boardNames: string[]) => {
	try {
		await PostModel.deleteMany(null, {
			boardName: { $in: boardNames },
		}).lean();
	} catch {
		throw new ApolloError("db error deleting board's posts");
	}
};
