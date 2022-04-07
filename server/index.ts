import { buildSchema } from "type-graphql";
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
import { createExpressApp, createApolloServer } from "./build";

const init = async () => {
	// make express app
	const app = createExpressApp();

	// build schema
	const schema = await buildSchema({
		resolvers,
		// authChecker,
	});

	const apolloConfig = {
		introspection: true,
		schema,
		context: (ctx: Context) => {
			// console.log(ctx.req.cookies);
			// console.log(ctx.res.cookie);
			const token = ctx.req.cookies.biConnectAccessToken;
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
	};

	const port = process.env.PORT || 3001;

	const server = await createApolloServer<Context>(app, apolloConfig);
	// expose on port
	app.listen({ port }, () => {
		console.log(`app is listening on port ${port}`);
	});

	// connect to db
	await connectToMongo();
};

init();
