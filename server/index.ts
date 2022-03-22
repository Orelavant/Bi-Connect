import express from "express";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import {
	ApolloServerPluginLandingPageGraphQLPlayground,
	ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import { resolvers } from "./resolvers";
import { connectToMongo } from "./utils/mongo";
import dotenv from "dotenv";
import { verifyJWT } from "./utils/jwt";
import { Context } from "./types/context";
import { User } from "./schema/user.schema";
dotenv.config();

const init = async () => {
	// build schema
	const schema = await buildSchema({
		resolvers,
		// authChecker,
	});

	// initialize express
	const app = express();
	app.use(cookieParser());

	// create apollo server
	const server = new ApolloServer({
		introspection: true,
		schema,
		context: (ctx: Context) => {
			// console.log(ctx.req.cookies);
			// console.log(ctx.res.cookie);
			const token = ctx.req.cookies.accessToken;
			if (token) {
				const user = verifyJWT<User>(token);
				ctx.user = user;
			}
			return ctx;
		},
		plugins: [
			process.env.NODE_ENV === "prod"
				? ApolloServerPluginLandingPageProductionDefault()
				: ApolloServerPluginLandingPageGraphQLPlayground(),
		],
	});

	// start server
	await server.start();

	// apply middleware
	server.applyMiddleware({ app });

	// expose on port
	const port = process.env.PORT || 3001;
	app.listen({ port }, () => {
		console.log(`app is listening on port ${port}`);
	});
	// connect to db
	await connectToMongo();
};

init();
