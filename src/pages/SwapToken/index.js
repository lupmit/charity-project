import React from "react";
import styles from "./styles.module.scss";
import Container from "../../components/Container";

const SwapToken = () => {
	return (
		<div className={styles.wrapper}>
			<Container>
				<iframe
					src="https://app.uniswap.org/#/swap?theme=light"
					width="100%"
					height="auto"
					title="Swap Token"
					style={{
						borderRadius: "4px",
						minHeight: "600px",
					}}
				></iframe>
			</Container>
		</div>
	);
};

export default SwapToken;
