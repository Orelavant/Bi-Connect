import express from "express";
import cookieParser from "cookie-parser";
import { ApolloServer, Config } from "apollo-server-express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

export const createExpressApp = () => {
	const app = express();
	app.use(cookieParser());
	app.use(
		cors({
			origin: ["http://localhost:3000", "http://localhost:5556"],
			credentials: true,
		})
	);
	return app;
};

export const createApolloServer = async <T>(
	app: express.Express | null,
	apolloConfig: Config<T>
) => {
	// create apollo server
	const server = new ApolloServer(apolloConfig);

	// start server
	await server.start();

	if (app) {
		// apply middleware
		server.applyMiddleware({ app, cors: false });
	}

	return server;
};
