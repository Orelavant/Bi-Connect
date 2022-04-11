import gql from "graphql-tag";

export const getUserPostsQuery = gql`
	query getUserComments($input: GetCommentsInput!) {
		getComments(input: $input) {
			creatorName
			content
			createdAt
			likes
			dislikes
		}
	}
`;
