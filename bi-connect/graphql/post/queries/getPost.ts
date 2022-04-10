import gql from "graphql-tag";

export const getPostQuery = gql`
	query getPost($input: PostIdInput!) {
		getPost(input: $input) {
			_id
			creatorName
			title
			content
		}
	}
`;