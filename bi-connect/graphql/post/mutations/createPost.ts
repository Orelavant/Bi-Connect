import { gql } from "graphql-tag";

export const createPostMutation = gql`
	mutation createPost(
		$input: CreatePostInput!,
        $boardDetails: BoardIdInput!,
		$creatorDetails: UserIdInput!
	) {
		createPost(input: $input, boardDetails: $boardDetails, creatorDetails: $creatorDetails) {
			creatorName
			title
            content
            boardName
		}
	}
`;