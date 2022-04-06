import gql from "graphql-tag";

export const getUsersQuery = gql`
	query getUsers($input: GetUsersInput!) {
		getUsers(input: $input) {
			username
			email
		}
	}
`;
