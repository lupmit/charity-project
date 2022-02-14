import React from "react";
import styles from "./styles.module.scss";

const TextArea = (props) => {
	const { label, labelClass, ...etc } = props;
	return (
		<div className={styles.wrapper}>
			<div className={labelClass}>{label}</div>
			<textarea rows={5} {...etc}></textarea>
		</div>
	);
};

export default TextArea;
