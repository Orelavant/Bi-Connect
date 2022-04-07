import { ApolloError } from "apollo-server-errors";
import { CommentModel, PostModel, UserModel } from "../schema/models";
import { Context } from "../types/context";
import bcrypt from "bcrypt";
import { signJWT } from "../utils/jwt";
import dotenv from "dotenv";
import {
	CreateUserInput,
	LoginInput,
	UserIdInput,
	UpdateUserInput,
	GetUsersInput,
	UsersIdsInput,
} from "../inputs/user.inputs";
import { types } from "@typegoose/typegoose";
import { User } from "../schema/user.schema";
dotenv.config();

export default class UserService {
	async createUser(input: CreateUserInput) {
		const { username, email } = input;
		if (!email.endsWith("haverford.edu") && !email.endsWith("brynmawr.edu")) {
			throw new ApolloError(
				"Sign up email must belong to haverford or bryn mawr"
			);
		}
		try {
			const userWithUsername = await UserModel.findOne({ username }).lean();
			if (userWithUsername) {
				throw new ApolloError("User with username already exists");
			}
		} catch {
			throw new ApolloError(
				"Error checking for existing user with username or user with username already exists"
			);
		}
		try {
			const userWithEmail = await UserModel.findOne({ email }).lean();
			if (userWithEmail) {
				throw new ApolloError("User with email already exists");
			}
		} catch {
			throw new ApolloError(
				"Error checking for user with email or user with email already exists"
			);
		}
		try {
			const user = await UserModel.create(input);
			return user;
		} catch {
			throw new ApolloError("db error");
		}
	}

	async login(input: LoginInput, context: Context) {
		const err = "Invalid email or password";
		// get user by email
		const user = await UserModel.findOne({ email: input.email }).lean();

		if (!user) {
			throw new ApolloError(err);
		}
		// validate password
		const passwordIsValid = await bcrypt.compare(input.password, user.password);

		if (!passwordIsValid) {
			throw new ApolloError(err);
		}

		// sign jwt
		const token = signJWT(user);

		// set cookie
		context.res.cookie("biConnectAccessToken", token, {
			maxAge: 3.154e10, // 1 year
			httpOnly: true,
			domain: process.env.DOMAIN || "localhost",
			path: "/",
			sameSite: "strict",
			secure: process.env.NODE_ENV === "prod",
		});

		// return jwt
		return token;
	}

	async loginAdmin(input: LoginInput, context: Context) {
		const err = "Invalid email or password";
		// get user by email
		const user = await UserModel.findOne({ email: input.email }).lean();

		if (!user) {
			throw new ApolloError(err);
		}
		// validate password
		const passwordIsValid = await bcrypt.compare(input.password, user.password);

		if (!passwordIsValid) {
			throw new ApolloError(err);
		}

		if (!user.admin) {
			throw new ApolloError("user not authorized");
		}

		// sign jwt
		const token = signJWT(user);

		// set cookie
		context.res.cookie("biConnectAccessToken", token, {
			maxAge: 3.154e10, // 1 year
			httpOnly: true,
			domain: process.env.DOMAIN || "localhost",
			path: "/",
			sameSite: "strict",
			secure: process.env.NODE_ENV === "prod",
		});

		// return jwt
		return token;
	}

	async updateUser(userDetails: UserIdInput, input: UpdateUserInput) {
		if (Object.keys(userDetails).length === 0) {
			throw new ApolloError("User details not provided");
		}
		try {
			const updatedUser = await UserModel.findOneAndUpdate(userDetails, input, {
				new: true,
			}).lean();
			return updatedUser;
		} catch {
			throw new ApolloError("User does not exists or db error");
		}
	}

	async getUser(input: UserIdInput) {
		if (Object.keys(input).length === 0) {
			throw new ApolloError("User details not provided");
		}
		try {
			const user = await UserModel.findOne(input).lean();
			return user;
		} catch {
			throw new ApolloError("User does not exist or db error");
		}
	}

	async getUsers(input: GetUsersInput) {
		const {
			usernameStartsWith,
			usernameEndsWith,
			usernameContains,
			emailStartsWith,
			emailEndsWith,
			emailContains,
			isVerified,
			isRemoved,
			createdAtBefore,
			createdAtAfter,
			updatedAtBefore,
			updatedAtAfter,
			limit,
			offset,
		} = input;
		const andFilter = [
			usernameStartsWith && {
				username: new RegExp(`^${usernameStartsWith}`, "i"),
			},
			usernameEndsWith && {
				username: new RegExp(`${usernameEndsWith}$`, "i"),
			},
			usernameContains && {
				username: new RegExp(`^.*${usernameContains}.*$`, "i"),
			},
			emailStartsWith && { email: new RegExp(`^${emailStartsWith}`, "i") },
			emailEndsWith && { email: new RegExp(`${emailEndsWith}$`, "i") },
			emailContains && { email: new RegExp(`^.*${emailContains}.*$`, "i") },
			isVerified != null && { verified: isVerified },
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
		const filterQuery = andFilter.length
			? {
					$and: andFilter,
			  }
			: {};
		try {
			const users = await UserModel.find(filterQuery)
				.sort({ username: 1 })
				.skip(offset)
				.limit(limit)
				.lean();
			return users;
		} catch {
			throw new ApolloError("Error finding users mathing query");
		}
	}

	async verifyUser(input: UserIdInput) {
		if (Object.keys(input).length === 0) {
			throw new ApolloError("User details not provided");
		}
		try {
			const user = await UserModel.findOneAndUpdate(
				input,
				{ verified: true },
				{ new: true }
			).lean();
			return user;
		} catch {
			throw new ApolloError("User does not exist or db error");
		}
	}

	async removeUser(input: UserIdInput) {
		if (Object.keys(input).length === 0) {
			throw new ApolloError("User details not provided");
		}
		try {
			const user = await UserModel.findOneAndUpdate(
				input,
				{ removed: true },
				{ new: true }
			).lean();
			return user;
		} catch {
			throw new ApolloError("User does not exist or db error");
		}
	}

	async restoreUser(input: UserIdInput) {
		if (Object.keys(input).length === 0) {
			throw new ApolloError("User details not provided");
		}
		try {
			const user = await UserModel.findOneAndUpdate(
				input,
				{ removed: false },
				{ new: true }
			).lean();
			return user;
		} catch {
			throw new ApolloError("User does not exist or db error");
		}
	}

	async deleteUser(input: UserIdInput) {
		if (Object.keys(input).length === 0) {
			throw new ApolloError("User details not provided");
		}
		// let user: types.DocumentType<User>;
		try {
			const user = await UserModel.findOneAndDelete(input).lean();
			return user;
		} catch {
			throw new ApolloError("User does not exist or db error");
		}
		// CASCADE ON COMMENTS AND POSTS
		// try {
		// 	await CommentModel.updateMany(
		// 		{
		// 			_id: {
		// 				$in: user.commentsIds,
		// 			},
		// 		},
		// 		{ removed: true }
		// 	).lean();
		// } catch {
		// 	throw new ApolloError("db error on cascade removing user comments");
		// }
		// try {
		// 	await PostModel.updateMany(
		// 		{
		// 			_id: {
		// 				$in: user.postsIds,
		// 			},
		// 		},
		// 		{ removed: true }
		// 	).lean();
		// } catch {
		// 	throw new ApolloError("db error on cascade removing user posts");
		// }
		// return user;
	}

	async deleteUsers(input: UsersIdsInput) {
		if (Object.keys(input).length === 0) {
			throw new ApolloError("User details not provided");
		}
		const filter = {
			$or: [
				{ username: { $in: input.usernames } },
				{ email: { $in: input.emails } },
			],
		};
		try {
			const deletedUsers = await UserModel.find(filter).lean();
			await UserModel.deleteMany(filter).lean();
			return deletedUsers;
		} catch {
			throw new ApolloError("User does not exist or db error");
		}
	}

	async getUserComments(input: UserIdInput) {
		if (Object.keys(input).length === 0) {
			throw new ApolloError("User details not provided");
		}
	}

	async getUserPosts(input: UserIdInput) {
		if (Object.keys(input).length === 0) {
			throw new ApolloError("User details not provided");
		}
	}
}
