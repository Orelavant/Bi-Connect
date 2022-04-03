import React from "react";
import styles from "../styles/TabListItem.module.scss";
interface TabListItemProps {
	children: React.ReactNode;
}

const TabListItem = ({ children }: TabListItemProps) => {
	return <div className={styles["tab-list-container"]}>{children}</div>;
};

export default TabListItem;
