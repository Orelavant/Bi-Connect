import { gql } from "graphql-tag";

export const boardsQuery = gql`
	query getBoards($input: GetBoardsInput!) {
		getBoards(input: $input) {
			name
			description
		}
	}
`;
