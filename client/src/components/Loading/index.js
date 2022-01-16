import React from "react";
import loading from "../../assets/images/loading.gif";
import styles from "./styles.module.scss";

const Loading = ({ style }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.content} style={style}>
				<img src={loading} />
			</div>
		</div>
	);
};

export default Loading;
