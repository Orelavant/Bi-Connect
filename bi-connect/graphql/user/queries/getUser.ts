import gql from "graphql-tag";

export const getUsersQuery = gql`
	query getUsers($input: GetUsersInput!) {
		getUsers(input: $input) {
			_id
			username
			email
		}
	}
`;

export const getUserQuery = gql`
	query getUser($input: UserIdInput!) {
		getUser(input: $input) {
			_id
			username
			email
			followedBoardsNames
			postsIds
			likedPostsIds
			dislikedPostsIds
			commentsIds
			likedCommentsIds
			dislikedCommentsIds
			verified
			removed
			admin
		}
	}
`;
