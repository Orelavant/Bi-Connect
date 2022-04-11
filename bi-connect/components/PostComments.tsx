import React, { useEffect, useState } from "react";
import { Button, Comment } from "semantic-ui-react";
import "fomantic-ui-css/semantic.css";
import CreateCommentDialog from "./CreateCommentDialog";
import CommentThread from "./CommentThread";
import tree_util from "tree-util";
import { useGetPostCommentsQuery } from "../generated/graphql";

const endpoint = "http://localhost:3001/graphql";
interface PostCommentsProps {
  postId: string;
}

const PostComments = (props: PostCommentsProps) => {
  const [reload, setReload] = useState(false);
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
    { input: { _id: props.postId } }
  );

  const data =
    !isCommentLoading && isCommentSuccess ? commentData.getPostComments : [{}];

  const standardConfig = { id: "_id", parentid: "parentId" };
  const tree = tree_util.buildTrees(data, standardConfig);

  return (
    <div>
      <CreateCommentDialog
        postId={props.postId}
        parentId={""}
        callBack={setReload}
      />
      <Comment.Group threaded>
        {tree
          .slice(0)
          .reverse()
          .map((commentTree, i) => (
            <CommentThread key={i} root={commentTree.rootNode}></CommentThread>
          ))}
      </Comment.Group>
    </div>
  );
};

export default PostComments;
