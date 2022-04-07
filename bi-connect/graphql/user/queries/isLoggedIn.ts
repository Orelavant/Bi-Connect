import gql from "graphql-tag";

export const isAdminLoggedInQuery = gql`
	query isAdminLoggedIn {
		isAdminLoggedIn {
			username
			email
			admin
		}
	}
`;
