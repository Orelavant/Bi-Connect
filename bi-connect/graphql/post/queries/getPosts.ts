import gql from "graphql-tag";

export const getPostsQuery = gql`
	query getPosts($input: GetPostsInput!) {
		getPosts(input: $input) {
			_id
			creatorName
			title
			content
		}
	}
`;