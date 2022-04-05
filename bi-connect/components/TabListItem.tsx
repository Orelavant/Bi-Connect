import React from "react";
import styles from "../styles/TabListItem.module.scss";
import {
	MdHighlightOff,
	MdModeEditOutline,
	MdRemoveRedEye,
} from "react-icons/md";
interface TabListItemProps {
	children: React.ReactNode;
	onClickDelete: () => void;
	onClickEdit: () => void;
	onClickView: () => void;
	onClickSoftDelete: () => void;
}

const TabListItem = ({ children }: TabListItemProps) => {
	return (
		<div className={styles["tab-list-container"]}>
			<div>{children}</div>
			<div className={styles["buttons-container"]}>
				<button className={styles["view-button"]}>
					<MdRemoveRedEye className={styles["view-button-icon"]} />
				</button>
				<button className={styles["delete-button"]}>
					<MdHighlightOff className={styles["delete-button-icon"]} />
				</button>
				<button className={styles["soft-delete-button"]}>
					<MdHighlightOff className={styles["soft-delete-button-icon"]} />
				</button>
				<button className={styles["edit-button"]}>
					<MdModeEditOutline className={styles["edit-button-icon"]} />
				</button>
			</div>
		</div>
	);
};

export default TabListItem;
