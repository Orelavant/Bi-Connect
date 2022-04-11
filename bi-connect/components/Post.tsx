import React, { useState } from "react";
import { Item, Image } from "semantic-ui-react";
import "fomantic-ui-css/semantic.css";
import styles from "../../../../styles/Post.module.scss";
import Link from "next/link";

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
	<Item>
        <Item.Content>
			<Link href={plink}>
          		<h3>{prop.title}</h3>
		  	</Link>
          <Item.Description>
            <p>{prop.content}</p>
          </Item.Description>
		  <Item.Extra>{prop.user}</Item.Extra>
        </Item.Content>
	</Item>
	)
}

export default Post;