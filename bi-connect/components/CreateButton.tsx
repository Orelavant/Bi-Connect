import React from "react";
import styles from "../styles/CreateButton.module.scss";
interface CreateButtonProps {
	buttonName: string;
	onClick: () => void;
}

const CreateButton = (props: CreateButtonProps) => {
	return (
		<button className={styles["create-button"]} onClick={props.onClick}>
			{props.buttonName}
		</button>
	);
};

export default CreateButton;
