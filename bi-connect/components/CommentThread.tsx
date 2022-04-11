import React, { useEffect, useState } from "react";
import { Comment, Form, Button } from "semantic-ui-react";
import "fomantic-ui-css/semantic.css";
import RelativeTime from "@yaireo/relative-time";
import CreateCommentDialog from "./CreateCommentDialog";

const endpoint = "http://localhost:3001/graphql";
interface CommentThreadProps {
  root: any;
}

const CommentThread = (props: CommentThreadProps) => {
  const [showReply, setShowReply] = useState(false);
  const relativeTime = new RelativeTime();

  return (
    <div>
      <Comment>
        <Comment.Avatar
          src="https://www.gravatar.com/avatar/?d=mp
"
        />
        <Comment.Content>
          <Comment.Author as="a">
            {props.root.dataObj.creatorName}
          </Comment.Author>
          <Comment.Metadata>
            {new Date(props.root.dataObj.createdAt) < new Date()
              ? relativeTime.from(new Date(props.root.dataObj.createdAt))
              : props.root.dataObj.createdAt}
          </Comment.Metadata>
          <Comment.Text>{props.root.dataObj.content}</Comment.Text>

          <Comment.Actions>
            <Comment.Action
              onClick={() => {
                setShowReply(true ? !showReply : false);
              }}
            >
              Reply
            </Comment.Action>
          </Comment.Actions>
          {showReply ? (
            <CreateCommentDialog
              callBack={setShowReply}
              postId={props.root.dataObj.postId}
              parentId={props.root.dataObj._id}
            />
          ) : null}
        </Comment.Content>
        <Comment.Group>
          {props.root.children.map((childRoot, i) => (
            <CommentThread key={i} root={childRoot} />
          ))}
        </Comment.Group>
      </Comment>
    </div>
  );
};

export default CommentThread;
