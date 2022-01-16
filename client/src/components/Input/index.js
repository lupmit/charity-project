import React from "react";
import styles from "./styles.module.scss";

const Input = (props) => {
	const { label, labelClass, ...etc } = props;
	return (
		<div className={styles.wrapper}>
			<div className={labelClass}>{label}</div>
			<input {...etc}></input>
		</div>
	);
};

export default Input;
