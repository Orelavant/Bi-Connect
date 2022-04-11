import { gql } from "graphql-tag";

export const updateUserMutation = gql`
	mutation updateUser($userDetails: UserIdInput!, $input: UpdateUserInput!) {
		updateUser(userDetails: $userDetails, input: $input) {
			_id
			username
			email
			followedBoardsNames
			verified
			admin
			removed
			updatedAt
		}
	}
`;
