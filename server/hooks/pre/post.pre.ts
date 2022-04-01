import { ApolloError } from "apollo-server-errors";
import { PostModel, UserModel, CommentModel } from "../../schema/models";

export const postPreDelete = async (filter) => {
	// CASCADE on user posts and post's comments
	try {
		const postsToBeDeleted = await PostModel.find(filter, {
			_id: 1,
			creatorName: 1,
		}).lean();
		const postsToBeDeletedIds = postsToBeDeleted.map(({ _id }) => _id);
		const postsToBeDeletedCreatorNames = postsToBeDeleted.map(
			({ creatorName }) => creatorName
		);
		await deletePostsFromUsers(
			postsToBeDeletedCreatorNames,
			postsToBeDeletedIds
		);
		await deletePostsComments(postsToBeDeletedIds);
	} catch (err) {
		throw err;
	}
};

export const deletePostsFromUsers = async (
	creatorNames: string[],
	creatorPostsIds: string[]
) => {
	try {
		await UserModel.updateMany(
			{ creatorName: { $in: creatorNames } },
			{
				postsIds: {
					$pullAll: creatorPostsIds,
				},
				likedPostsIds: {
					$pullAll: creatorPostsIds,
				},
				dislikedPostsIds: {
					$pullAll: creatorPostsIds,
				},
			}
		).lean();
	} catch {
		throw new ApolloError("db error deleting posts from users");
	}
};

export const deletePostsComments = async (postsIds: string[]) => {
	try {
		await CommentModel.deleteMany({
			postId: {
				$in: postsIds,
			},
		}).lean();
	} catch {
		throw new ApolloError("db error deleting posts' comments");
	}
};
