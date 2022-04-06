import { gql } from "graphql-tag";

export const loginMutation = gql`
	mutation login($input: LoginInput!) {
		login(input: $input)
	}
`;

export const adminLoginMutation = gql`
	mutation loginAdmin($input: LoginInput!) {
		loginAdmin(input: $input)
	}
`;
