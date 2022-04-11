import React from "react";
import { Comment } from "semantic-ui-react";
import "fomantic-ui-css/semantic.css";
import { useGetPostCommentsQuery } from "../generated/graphql";
import tree_util from "tree-util";

const endpoint = "http://localhost:3001/graphql";
interface CommentThreadProps {
  postid: string;
}

const CommentThread = (props: CommentThreadProps) => {
  const {
    isLoading: isCommentLoading,
    isError: isCommentError,
    data: commentData,
    error: commentError,
    isSuccess: isCommentSuccess,
  } = useGetPostCommentsQuery(
    {
      endpoint,
      fetchParams: {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    },
    { input: { _id: props.postid } }
  );

  const data = 

  let tree = tree_util.buildTrees();

  console.log(commentData);
  return (
    <Comment>
      <Comment.Content>
        <Comment.Author as="a">
          {commentData?.getPostComments[0].creatorName}
        </Comment.Author>
        <Comment.Metadata>
          <div>Today at 5:42PM</div>
        </Comment.Metadata>
        <Comment.Text>How artistic!</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  );
};

export default CommentThread;
