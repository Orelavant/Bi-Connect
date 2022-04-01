import { ApolloError } from "apollo-server-errors";
import { CommentModel, UserModel } from "../../schema/models";

export const commentPreDelete = async (filter) => {
	try {
		const commentsToBeDeleted = await CommentModel.find(filter, {
			_id: 1,
			creatorName: 1,
		}).lean();
		const commentsToBeDeletedIds = commentsToBeDeleted.map(({ _id }) => _id);
		const commentsToBeDeletedCreatorNames = commentsToBeDeleted.map(
			({ creatorName }) => creatorName
		);
		await deleteCommentsFromUsers(
			commentsToBeDeletedCreatorNames,
			commentsToBeDeletedIds
		);
	} catch (err) {
		throw err;
	}
};

export const deleteCommentsFromUsers = async (
	commentsCreatorNames: string[],
	commentsIds: string[]
) => {
	try {
		await UserModel.updateMany(
			{ creatorName: { $in: commentsCreatorNames } },
			{
				commentsIds: {
					$pullAll: commentsIds,
				},
				likedCommentsIds: {
					$pullAll: commentsIds,
				},
				dislikedCommentsIds: {
					$pullAll: commentsIds,
				},
			}
		).lean();
	} catch {
		throw new ApolloError("db error deleting comments from users");
	}
};
