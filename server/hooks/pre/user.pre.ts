import {
	BeAnObject,
	DocumentType,
	IObjectWithTypegooseFunction,
} from "@typegoose/typegoose/lib/types";
import { ApolloError } from "apollo-server-errors";
import { UserModel, CommentModel, PostModel } from "../../schema/models";
import { User } from "../../schema/user.schema";
import bcrypt from "bcrypt";

export const userPreDelete = async (filter) => {
	try {
		const usersToBeDeleted = await UserModel.find(filter, {
			username: 1,
			likedCommentsIds: 1,
			dislikedCommentsIds: 1,
			likedPostsIds: 1,
			dislikedPostsIds: 1,
		}).lean();
		const usersToBeDeletedUsernames = usersToBeDeleted.map(
			({ username }) => username
		);
		try {
			// delete comments and posts of the users
			await deleteUsersComments(usersToBeDeletedUsernames);
			await deleteUsersPosts(usersToBeDeletedUsernames);
			// increment/decrement posts that the users liked/disliked
			await decrementUserPostCommentsLikeDislikes(usersToBeDeleted);
		} catch (err) {
			throw err;
		}
	} catch {
		throw new ApolloError(
			"db error cascading delete on users' comments and posts"
		);
	}
};

export const deleteUsersComments = async (usernames: string[]) => {
	try {
		await CommentModel.deleteMany(null, {
			creatorName: {
				$in: usernames,
			},
		}).lean();
	} catch {
		throw new ApolloError("db error deleting users' comments");
	}
};

export const deleteUsersPosts = async (usernames: string[]) => {
	try {
		await PostModel.deleteMany(null, {
			creatorName: {
				$in: usernames,
			},
		}).lean();
	} catch {
		throw new ApolloError("db error deleting users' posts");
	}
};

interface LikeDislikes {
	likes: number;
	dislikes: number;
}

export const decrementUserPostCommentsLikeDislikes = async (
	usersToBeDeleted: any
) => {
	const { commentsLikesDislikes, postsLikesDislikes } = usersToBeDeleted.reduce(
		(
			{ commentsLikesDislikes, postsLikesDislikes },
			{ likedCommentsIds, dislikedCommentsIds, likedPostsIds, dislikedPostsIds }
		) => {
			likedCommentsIds.forEach((_id) => {
				const { likes = 0, dislikes = 0 } = commentsLikesDislikes.get(_id);
				commentsLikesDislikes.set(_id, { likes: likes + 1, dislikes });
			});
			dislikedCommentsIds.forEach((_id) => {
				const { likes = 0, dislikes = 0 } = commentsLikesDislikes.get(_id);
				commentsLikesDislikes.set(_id, {
					likes: likes,
					dislikes: dislikes + 1,
				});
			});
			likedPostsIds.forEach((_id) => {
				const { likes = 0, dislikes = 0 } = postsLikesDislikes.get(_id);
				postsLikesDislikes.set(_id, {
					likes: likes + 1,
					dislikes: dislikes,
				});
			});
			dislikedPostsIds.forEach((_id) => {
				const { likes = 0, dislikes = 0 } = postsLikesDislikes.get(_id);
				postsLikesDislikes.set(_id, {
					likes: likes,
					dislikes: dislikes + 1,
				});
			});
			return { commentsLikesDislikes, postsLikesDislikes };
		},
		{
			commentsLikesDislikes: new Map<string, LikeDislikes>(),
			postsLikesDislikes: new Map<string, LikeDislikes>(),
		}
	);
	const commentQueries = commentsLikesDislikes
		.entries()
		.map(([_id, likesDislikes]) => ({
			updateOne: {
				filter: { _id },
				update: {
					$dec: {
						likes: likesDislikes.likes,
						dislikes: likesDislikes.dislikes,
					},
				},
			},
		}));
	try {
		await CommentModel.bulkWrite(commentQueries);
	} catch {
		throw new ApolloError(
			"db error removing likes and dislikes from user comments"
		);
	}
	const postQueries = postsLikesDislikes
		.entries()
		.map(([_id, likesDislikes]) => ({
			findByIdAndUpdate: {
				filter: { _id },
				update: {
					$dec: {
						likes: likesDislikes.likes,
						dislikes: likesDislikes.dislikes,
					},
				},
			},
		}));
	try {
		await PostModel.bulkWrite(postQueries);
	} catch {
		throw new ApolloError(
			"db error removing likes and dislikes from user posts"
		);
	}
};

export const userPreSave = async (user: DocumentType<User, BeAnObject>) => {
	try {
		if (user.isModified("password")) {
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(user.password, salt);
			user.password = hash;
		}
	} catch (err) {
		throw new ApolloError("error hashing password");
	}
};
