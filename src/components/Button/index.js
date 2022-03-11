import React from "react";
import classnames from "classnames";
import { Spinner } from "react-bootstrap";
import styles from "./styles.module.scss";

const Button = (props) => {
	const { children, className, typeButton, loading = false, ...rest } = props;
	const getClassName = (type) => {
		switch (type) {
			case "outline":
				return styles.buttonOutline;
			case "action":
				return styles.buttonAction;
			default:
				return styles.buttonDefault;
		}
	};
	return (
		<button
			className={classnames(className, getClassName(typeButton))}
			style={loading ? { opacity: 0.5 } : {}}
			disabled={loading}
			{...rest}
		>
			{loading && (
				<Spinner animation="border" size="sm" style={{ marginRight: "5px" }} />
			)}
			{children}
		</button>
	);
};

export default Button;
