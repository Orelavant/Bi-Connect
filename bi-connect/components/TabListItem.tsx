import React from "react";
import styles from "../styles/TabListItem.module.scss";
import Link from "next/link";
import {
	MdHighlightOff,
	MdModeEditOutline,
	MdRemoveRedEye,
} from "react-icons/md";

interface TabListItemProps {
	children: React.ReactNode;
	onClickDelete?: () => void;
	onClickEdit?: () => void;
	onClickView?: () => void;
	onClickSoftDelete?: () => void;
	nextPageName?: string;
}

const TabListItem = (props: TabListItemProps) => {
	return (
		<div className={styles["tab-list-container"]}>
			<div>{props.children}</div>
			<div className={styles["buttons-container"]}>
				<button className={styles["view-button"]}>
					<Link href={props.nextPageName || ""}>
						<MdRemoveRedEye className={styles["view-button-icon"]} />
					</Link>
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
