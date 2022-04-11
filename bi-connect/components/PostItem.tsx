import React from "react";
import { Item, Icon, Comment, Header, Form, Button } from "semantic-ui-react";
import "fomantic-ui-css/semantic.css";
import RelativeTime from "@yaireo/relative-time";
("npm i @yaireo/relative-time -S");
("npm i --save-dev @types/yaireo__relative-time");
import Link from "next/link";

interface PostCommentProps {
  creatorName: string | null | undefined;
  title: string | null | undefined;
  content: string | null | undefined;
  createdAt: string;
  likes: number | null;
  dislikes: number | null | undefined;
}

const relativeTime = new RelativeTime();

const PostCommentsitem = (props: PostCommentProps) => {
  return (
    <Item.Group>
      <Item>
        <Item.Content>
          <Item.Header>{props.title}</Item.Header>
          <Item.Meta>by {props.creatorName}</Item.Meta>
          <span>{props.content}</span>
          <Item.Meta>{relativeTime.from(new Date(props.createdAt))}</Item.Meta>
          <Item.Extra>
            <Icon color="black" name="thumbs up outline" />
            <span>{props.likes}</span>
            <Icon color="black" name="thumbs down outline" />
            <span>{props.dislikes}</span>
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  );
};

export default PostCommentsitem;
