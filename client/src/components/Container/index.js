import React from "react";
import styles from "./styles.module.scss";

const Container = (props) => {
	const { children, ...rest } = props;
	return (
		<div className={styles.wrapper} {...rest}>
			{children}
		</div>
	);
};

export default Container;
