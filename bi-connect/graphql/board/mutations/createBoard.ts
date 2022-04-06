import { gql } from "graphql-tag";

export const createBoardMutation = gql`
	mutation createBoard(
		$input: CreateBoardInput!
		$creatorDetails: UserIdInput!
	) {
		createBoard(input: $input, creatorDetails: $creatorDetails) {
			name
			description
		}
	}
`;
