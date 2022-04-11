import { gql } from "graphql-tag";

export const postCommentsQuery = gql`
query getPostComments($input: PostIdInput!) {
    getPostComments(input: $input){
        _id
        createdAt
        creatorName
        content
        likes
        dislikes
        parentId
        postId
    }
}
`;