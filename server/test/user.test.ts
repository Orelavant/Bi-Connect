import jest from "jest";
import { apolloServer } from "./utils";
import { ApolloServer } from "apollo-server-express";
import { Context } from "../types/context";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

describe("user tests", () => {
	// =======================================
	let server: ApolloServer<Context>;
	let db: MongoMemoryServer;
	beforeAll(async () => {
		({ server, db } = await apolloServer());
	});
	afterAll(async () => {
		await server.stop();
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
		await db.stop();
	});
	// beforeEach(async () => {
	// 	reset dummy data
	// });
	afterEach(async () => {
		await mongoose.connection.dropDatabase();
	});
	// =======================================

	it("Create a user with haverford email", async () => {
		const createUserMutation = `
			mutation createUser($input: CreateUserInput!){
				createUser(input: $input) {
					username
					email
				}
			}
		`;
		const createUserMutationFields = {
			username: "foo",
			email: "foo@haverford.edu",
			password: "123456",
		};
		const variables = {
			input: createUserMutationFields,
		};
		const createUserRes = await server.executeOperation({
			query: createUserMutation,
			variables,
		});
		expect(createUserRes.errors).toBeUndefined();
		const {
			data: { createUser },
		} = createUserRes;
		expect(createUser.username).toEqual(createUserMutationFields.username);
		expect(createUser.email).toEqual(createUserMutationFields.email);

		const getUserQuery = `
			query getUser($input: UserIdInput!){
				getUser(input: $input) {
					username
					email
				}
			}
		`;
		const getUserQueryFields = {
			username: "foo",
		};
		const getUserQueryVariables = {
			input: getUserQueryFields,
		};
		const getUserRes = await server.executeOperation({
			query: getUserQuery,
			variables: getUserQueryVariables,
		});
		expect(getUserRes.errors).toBeUndefined();
		const {
			data: { getUser },
		} = getUserRes;
		expect(getUser.username).toEqual(getUserQueryFields.username);
	});

	it("Create a user with brynmawr email", async () => {
		const createUserMutation = `
			mutation createUser($input: CreateUserInput!){
				createUser(input: $input) {
					username
					email
				}
			}
		`;
		const createUserMutationFields = {
			username: "baz",
			email: "baz@brynmawr.edu",
			password: "123456",
		};
		const createUserMutationVariables = {
			input: createUserMutationFields,
		};
		const createUserRes = await server.executeOperation({
			query: createUserMutation,
			variables: createUserMutationVariables,
		});
		expect(createUserRes.errors).toBeUndefined();
		const {
			data: { createUser },
		} = createUserRes;
		expect(createUser.username).toEqual(createUserMutationFields.username);
		expect(createUser.email).toEqual(createUserMutationFields.email);

		const getUserQuery = `
			query getUser($input: UserIdInput!){
				getUser(input: $input) {
					username
					email
				}
			}
		`;
		const getUserQueryFields = {
			username: "baz",
		};
		const getUserQueryVariables = {
			input: getUserQueryFields,
		};
		const getUserRes = await server.executeOperation({
			query: getUserQuery,
			variables: getUserQueryVariables,
		});
		expect(getUserRes.errors).toBeUndefined();
		const {
			data: { getUser },
		} = getUserRes;
		expect(getUser.username).toEqual(getUserQueryFields.username);
	});

	it("Create a user with non bi-co email", async () => {
		const createUserMutation = `
			mutation createUser($input: CreateUserInput!){
				createUser(input: $input) {
					username
					email
				}
			}
		`;
		const createUserMutationFields = {
			username: "foo",
			email: "foo@gmail.edu",
			password: "123456",
		};
		const createUserMutationVariables = {
			input: createUserMutationFields,
		};
		const createUserRes = await server.executeOperation({
			query: createUserMutation,
			variables: createUserMutationVariables,
		});
		expect(createUserRes.errors).toBeDefined();

		const getUserQuery = `
			query getUser($input: UserIdInput!){
				getUser(input: $input) {
					username
					email
				}
			}
		`;
		const getUserQueryFields = {
			username: "foo",
		};
		const getUserQueryVariables = {
			input: getUserQueryFields,
		};
		const getUserRes = await server.executeOperation({
			query: getUserQuery,
			variables: getUserQueryVariables,
		});
		const {
			data: { getUser },
		} = getUserRes;
		expect(getUser).toEqual(null);
	});

	it("Create a user with short password < 6", async () => {
		const createUserMutation = `
			mutation createUser($input: CreateUserInput!){
				createUser(input: $input) {
					username
					email
				}
			}
		`;
		const createUserMutationFields = {
			username: "foo",
			email: "foo@gmail.edu",
			password: "123",
		};
		const createUserMutationVariables = {
			input: createUserMutationFields,
		};
		const createUserRes = await server.executeOperation({
			query: createUserMutation,
			variables: createUserMutationVariables,
		});
		expect(createUserRes.errors).toBeDefined();

		const getUserQuery = `
			query getUser($input: UserIdInput!){
				getUser(input: $input) {
					username
					email
				}
			}
		`;
		const getUserQueryFields = {
			username: "foo",
		};
		const getUserQueryVariables = {
			input: getUserQueryFields,
		};
		const getUserRes = await server.executeOperation({
			query: getUserQuery,
			variables: getUserQueryVariables,
		});
		const {
			data: { getUser },
		} = getUserRes;
		expect(getUser).toEqual(null);
	});
});
