import React from "react";
import { Item, Image, Comment, Header, Form, Button } from "semantic-ui-react";
import "fomantic-ui-css/semantic.css";

interface PostCommentProps {
  username: string | null | undefined;
  title: string | null | undefined;
  content: string | null | undefined;
  timestamp: string | null | undefined;
}

const PostCommentsitem = (props: PostCommentProps) => {
  return (
    <Item.Group>
      <Item>
        <Item.Content>
          <Item.Header as="a"></Item.Header>
          <Item.Meta>Description</Item.Meta>
          <Item.Description></Item.Description>
          <Item.Extra>Additional Details</Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  );
};

export default PostCommentsitem;
