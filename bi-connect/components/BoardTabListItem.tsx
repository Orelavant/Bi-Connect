import React from "react";
import TabListItem from "./TabListItem";

interface BoardTabListItemProps {
	_id: string;
	name: string;
	description: string;
}

const BoardTabListItem = (props: BoardTabListItemProps) => {
	return (
		<TabListItem nextPageName={`/admin/board/${props._id}`}>
			<div>{"Board Name: " + props.name}</div>
			<div>{"Board Description: " + props.description}</div>
		</TabListItem>
	);
};

export default BoardTabListItem;
