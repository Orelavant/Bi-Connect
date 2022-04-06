import React from "react";
import TabListItem from "./TabListItem";
import styles from "../styles/TabListItem.module.scss";
const LoadingTabItem = () => {
	return (
		<TabListItem>
			<div className={styles["dummy-container"]}></div>
			<div className={styles["dummy-container"]}></div>
			<div className={styles["dummy-container"]}></div>
		</TabListItem>
	);
};

export default LoadingTabItem;
