import React from "react";
import TabListItem from "./TabListItem";

interface BoardTabListItemProps {
	boardname: string;
	boardDescription: string;
}

const BoardTabListItem = (props: BoardTabListItemProps) => {
	return (
		<TabListItem>
			<div>{"Board Name: " + props.boardname}</div>
			<div>{"Board Description: " + props.boardDescription}</div>
		</TabListItem>
	);
};

export default BoardTabListItem;
