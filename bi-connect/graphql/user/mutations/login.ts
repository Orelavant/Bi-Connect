import { gql } from "graphql-tag";

export const adminLoginMutation = gql`
	mutation loginAdmin($input: LoginInput!) {
		loginAdmin(input: $input)
	}
`;
