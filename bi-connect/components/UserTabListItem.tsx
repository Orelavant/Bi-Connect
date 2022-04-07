import React from "react";
import styles from "../styles/UserTabListItem.module.scss";
import TabListItem from "./TabListItem";
interface UserTabListItemProps {
	username: string;
	email: string;
}

const UserTabListItem = (props: UserTabListItemProps) => {
	return (
		<TabListItem nextPageName={`/admin/${props.username}`}>
			<div className={styles["user-container"]}>
				<div>{"Username: " + props.username}</div>
				<div>{"Email: " + props.email}</div>
			</div>
		</TabListItem>
	);
};

export default UserTabListItem;
