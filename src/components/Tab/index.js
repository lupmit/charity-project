import React from "react";
import { Tab as TabComponent, Tabs } from "react-bootstrap";

import styles from "./styles.module.scss";

const Tab = (props) => {
	const { children } = props;
	return (
		<Tabs
			defaultActiveKey="desc"
			id="uncontrolled-tab-example"
			className={styles.tabWrapper}
		>
			{children}
		</Tabs>
	);
};

export { Tab, TabComponent };
