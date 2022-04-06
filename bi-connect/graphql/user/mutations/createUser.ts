import { gql } from "graphql-tag";

export const createUserMutation = gql`
	mutation createUser($input: CreateUserInput!) {
		createUser(input: $input) {
			email
			username
		}
	}
`;
