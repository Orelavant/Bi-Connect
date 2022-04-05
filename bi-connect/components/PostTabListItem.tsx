import React from "react";
import TabListItem from "./TabListItem";

interface PostTabListItemProps {
	postName: string;
	postContent: string;
}

const PostTabListItem = (props: PostTabListItemProps) => {
	return (
		<TabListItem>
			<div>{"Post Name: " + props.postName}</div>
			<div>{"Post Description: " + props.postContent}</div>
		</TabListItem>
	);
};

export default PostTabListItem;

