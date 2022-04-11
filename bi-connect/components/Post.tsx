import React, { useState } from "react";
import { Item, Image, Button, Icon } from "semantic-ui-react";
import "fomantic-ui-css/semantic.css";
import Link from "next/link";
import styles from "../styles/Post.module.scss";

interface PostProps {
  boardName: string;
  id: string;
  title: string;
  content: string;
  user: string;
}

// Use this for styling the header if you get the chance className={styles["header"]}
const Post = (prop: PostProps) => {
  var plink = "/admin/board/" + prop.boardName + "/" + prop.id;
  return (
    <div className={styles["post-container"]}>
      <Item>
        <Item.Content>
          <Link href={plink}>
            <h3>{prop.title}</h3>
          </Link>
          <Item.Meta>by {prop.user}</Item.Meta>
          <span>{prop.content}</span>
          <Item.Extra>
            <Link href={plink}>
              <Button primary floated="right">
                View Post
                <Icon name="angle right" />
              </Button>
            </Link>
          </Item.Extra>
        </Item.Content>
      </Item>
    </div>
  );
};

export default Post;
