import { ApolloError } from "apollo-server-errors";
import { UserModel } from "../schema/models";
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
} from "../inputs/user.inputs";
dotenv.config();

export default class UserService {
	async createUser(input: CreateUserInput) {
		const { username, email } = input;
		if (!email.endsWith("haverford.edu") && !email.endsWith("brynmawr.edu")) {
			throw new ApolloError(
				"Sign up email must belong to haverford or bryn mawr"
			);
		}
		const userWithUsername = await UserModel.findOne({ username }).lean();
		if (userWithUsername) {
			throw new ApolloError("User with username already exists");
		}
		const userWithEmail = await UserModel.findOne({ email }).lean();
		if (userWithEmail) {
			throw new ApolloError("User with email already exists");
		}
		const user = await UserModel.create(input);
		return user;
	}

	// async login(input: LoginInput, context: Context) {
	// 	const err = "Invalid email or password";
	// 	// get user by email
	// 	const user = await UserModel.findOne({ email: input.email }).lean();

	// 	if (!user) {
	// 		throw new ApolloError(err);
	// 	}
	// 	// validate password
	// 	const passwordIsValid = await bcrypt.compare(input.password, user.password);

	// 	if (!passwordIsValid) {
	// 		throw new ApolloError(err);
	// 	}

	// 	// sign jwt
	// 	const token = signJWT(user);

	// 	// set cookie
	// 	context.res.cookie("accessToken", token, {
	// 		maxAge: 3.154e10, // 1 year
	// 		httpOnly: true,
	// 		domain: process.env.DOMAIN || "localhost",
	// 		path: "/",
	// 		sameSite: "strict",
	// 		secure: process.env.NODE_ENV === "prod",
	// 	});

	// 	// return jwt
	// 	return token;
	// }

	async updateUser(userDetails: UserIdInput, input: UpdateUserInput) {
		if (Object.keys(userDetails).length === 0) {
			throw new ApolloError("User details not provided");
		}
		const updatedUser = await UserModel.findOneAndUpdate(userDetails, input, {
			new: true,
		});
		return updatedUser;
	}

	async getUser(input: UserIdInput) {
		if (Object.keys(input).length === 0) {
			throw new ApolloError("User details not provided");
		}
		const user = await UserModel.findOne(input);
		return user;
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
		const filterQuery = {
			$and: [
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
			].filter(Boolean),
		};
		const users = await UserModel.find(filterQuery)
			.sort({ username: 1 })
			.skip(offset)
			.limit(limit);
		return users;
	}

	async verifyUser(input: UserIdInput) {
		if (Object.keys(input).length === 0) {
			throw new ApolloError("User details not provided");
		}
		const user = await UserModel.findOneAndUpdate(
			input,
			{ verified: true },
			{ new: true }
		);
		return user;
	}

	async removeUser(input: UserIdInput) {
		if (Object.keys(input).length === 0) {
			throw new ApolloError("User details not provided");
		}
		const user = await UserModel.findOneAndUpdate(
			input,
			{ removed: true },
			{ new: true }
		);
		return user;
	}

	async restoreUser(input: UserIdInput) {
		if (Object.keys(input).length === 0) {
			throw new ApolloError("User details not provided");
		}
		const user = await UserModel.findOneAndUpdate(
			input,
			{ removed: false },
			{ new: true }
		);
		return user;
	}

	async deleteUser(input: UserIdInput) {
		if (Object.keys(input).length === 0) {
			throw new ApolloError("User details not provided");
		}
		const user = await UserModel.deleteOne(input);
		return user;
	}
}
