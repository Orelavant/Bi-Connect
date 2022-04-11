import Link from "next/link";
import React from "react";
import styles from "../styles/UserFollowedBoard.module.scss";

interface UserFollowedBoardProps {
	boardName: string;
}

const UserFollowedBoard = ({ boardName }: UserFollowedBoardProps) => {
	return (
		<button className={styles["user-followed-board"]}>
			<Link href={`/admin/board/${boardName}`}>{boardName}</Link>
		</button>
	);
};

export default UserFollowedBoard;
