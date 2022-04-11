import { gql } from "graphql-tag";

export const createCommentMutation = gql`
    mutation createComment($input: CreateCommentInput!, 
        $postDetails: PostIdInput!,
        $creatorDetails: UserIdInput!) {
            createComment(input: $input, postDetails: $postDetails, 
            creatorDetails: $creatorDetails) {
            _id
        }
        }
`;