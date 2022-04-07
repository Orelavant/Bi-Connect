import React, { useState } from "react";
import { Item, Image } from "semantic-ui-react";
import "fomantic-ui-css/semantic.css";

interface PostProps {
	title: string;
	content: string;
	user: string;
}

const Post = (prop: PostProps) => {
	return (
	<Item>
        <Item.Content>
          <Item.Header as='a' to='localhost:3000/admin'>{prop.title}</Item.Header>
          <Item.Description>
            <p>{prop.content}</p>
          </Item.Description>
		  <Item.Extra>{prop.user}</Item.Extra>
        </Item.Content>
	</Item>
	)
}

export default Post;