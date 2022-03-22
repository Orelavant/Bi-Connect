import { ApolloError } from "apollo-server-errors";
import { CreateUserInput, LoginInput, UserModel } from "../schema/user.schema";
import { Context } from "../types/context";
import bcrypt from "bcrypt";
import { signJWT } from "../utils/jwt";
import dotenv from "dotenv";
dotenv.config();

export default class UserService {
	async createUser(input: CreateUserInput) {
		return UserModel.create(input);
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
		context.res.cookie("accessToken", token, {
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
}
