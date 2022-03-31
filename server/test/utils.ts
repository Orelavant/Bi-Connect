import { mongoose } from "@typegoose/typegoose";
import express from "express";
import { MongoMemoryServer } from "mongodb-memory-server";
import { buildSchema } from "type-graphql";
import { createApolloServer } from "../build";
import { resolvers } from "../resolvers";
import { Context } from "../types/context";
let server;
let db;

export const apolloServer = async () => {
	// build schema
	const schema = await buildSchema({
		resolvers,
		// authChecker,
	});

	const apolloConfig = {
		introspection: true,
		schema,
		context: (ctx: Context) => {
			return ctx;
		},
	};
	server = await createApolloServer<Context>(null, apolloConfig);
	db = await MongoMemoryServer.create();

	const uri = db.getUri("bi-connect");
	await mongoose.connect(uri);

	return { server, db };
};
