import React from "react";
import styles from "../styles/UserTabListItem.module.scss";
import TabListItem from "./TabListItem";
interface UserTabListItemProps {
	_id: string;
	username: string;
	email: string;
}

const UserTabListItem = (props: UserTabListItemProps) => {
	return (
		<TabListItem nextPageName={`/admin/user/${props._id}`}>
			<div className={styles["user-container"]}>
				<div>{"Username: " + props.username}</div>
				<div>{"Email: " + props.email}</div>
			</div>
		</TabListItem>
	);
};

export default UserTabListItem;
