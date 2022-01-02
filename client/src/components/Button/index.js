import React from "react";
import classnames from "classnames";
import styles from "./styles.module.scss";

const Button = (props) => {
	const { children, className, type, ...rest } = props;
	const getClassName = (type) => {
		switch (type) {
			case "outline":
				return styles.buttonOutline;
			default:
				return styles.buttonDefault;
		}
	};
	return (
		<button className={classnames(className, getClassName(type))} {...rest}>
			{children}
		</button>
	);
};

export default Button;
