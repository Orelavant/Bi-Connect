import React, { forwardRef } from "react";
import styles from "../styles/CustomInput.module.scss";

interface CustomInputProps
	extends React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	label?: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
	(props, ref) => {
		return (
			<div className={styles["input-container"]} data-label={props.label}>
				<input {...props} ref={ref} className={styles["input"]} />
			</div>
		);
	}
);

export default CustomInput;
