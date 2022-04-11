import gql from "graphql-tag";

export const getUserPostsQuery = gql`
	query getUserPosts($input: GetPostsInput!) {
		getPosts(input: $input) {
			title
			creatorName
			content
			createdAt
			likes
			dislikes
		}
	}
`;
