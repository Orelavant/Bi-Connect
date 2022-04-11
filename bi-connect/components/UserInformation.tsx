import Link from "next/link";
import React from "react";
import { MdHighlightOff } from "react-icons/md";
import styles from "../styles/UserInformation.module.scss";
import EditUserDialog from "./EditUserDialog";
import UserFollowedBoard from "./UserFollowedBoard";

interface UserInformationProps {
	username: string;
	email: string;
	followedBoardsNames: string[];
	verified: boolean;
	removed: boolean;
	admin: boolean;
}

const UserInformation = ({
	username,
	email,
	followedBoardsNames,
	verified,
	removed,
	admin,
}: UserInformationProps) => {
	return (
		<div className={styles["user-page-container"]}>
			<div className={styles["user-information-container"]}>
				<div className={styles["user-meta-data-container"]}>
					<div
						className={styles["user-removed"]}
						style={{
							backgroundColor: admin ? "purple" : "lightgray",
							opacity: admin ? 1 : 0.33,
							color: admin ? "white" : "black",
						}}
					>
						Admin
					</div>
					<div
						className={styles["user-verified"]}
						style={{
							backgroundColor: verified ? "green" : "lightgray",
							opacity: verified ? 1 : 0.33,
							color: verified ? "white" : "black",
						}}
					>
						Verified
					</div>
					<div
						className={styles["user-removed"]}
						style={{
							backgroundColor: removed ? "red" : "lightgray",
							opacity: removed ? 1 : 0.33,
							color: removed ? "white" : "black",
						}}
					>
						Removed
					</div>
				</div>
				<label>Username</label>
				<div>{username}</div>
				<label>Email</label>
				<div>{email}</div>
				<label>Followed Boards</label>
				<div className={styles["user-followed-boards-items-container"]}>
					{followedBoardsNames?.map((n) => (
						<UserFollowedBoard boardName={n} />
					))}
				</div>
				<div className={styles["buttons-container"]}>
					<EditUserDialog username={username} admin={admin} removed={removed} />
					<button className={styles["soft-delete-button"]} title="Remove User">
						<MdHighlightOff className={styles["soft-delete-button-icon"]} />
					</button>
					<button className={styles["delete-button"]} title="Delete User">
						<MdHighlightOff className={styles["delete-button-icon"]} />
					</button>
				</div>
			</div>
			<label>Activity</label>
			<div className={styles["user-posts-comments-container"]}></div>
		</div>
	);
};

export default UserInformation;
