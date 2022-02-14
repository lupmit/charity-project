import React from "react";
import styles from "./styles.module.scss";
import Container from "../../components/Container";

const SwapToken = () => {
	return (
		<div className={styles.wrapper}>
			<Container>
				<iframe
					src="https://app.uniswap.org/#/swap?exactField=input&exactAmount=10&inputCurrency=0x6b175474e89094c44da98b954eedeac495271d0f"
					width="100%"
					height="100%"
					style={{
						border: 0,
						margin: "0 auto",
						marginBottom: ".5rem",
						display: "block",
						borderRadius: "10px",
					}}
				></iframe>
			</Container>
		</div>
	);
};

export default SwapToken;
