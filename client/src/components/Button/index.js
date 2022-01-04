import React from "react";
import classnames from "classnames";
import styles from "./styles.module.scss";

const Button = (props) => {
	const { children, className, typeButton, ...rest } = props;
	const getClassName = (type) => {
		switch (type) {
			case "outline":
				return styles.buttonOutline;
			default:
				return styles.buttonDefault;
		}
	};
	return (
		<button
			className={classnames(className, getClassName(typeButton))}
			{...rest}
		>
			{children}
		</button>
	);
};

export default Button;
