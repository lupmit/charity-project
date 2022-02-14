import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../components/Wallet";
import Modal from "../../components/Modal";
import { useLocation } from "react-router-dom";
import styles from "./styles.module.scss";

const Login = (props) => {
	const { children, onHide, show, ...etc } = props;
	const { active, activate, error } = useWeb3React();
	const [loading, setLoading] = useState(false);

	async function connect() {
		if (active) {
			onHide();
			return;
		}
		setLoading(true);
		try {
			await activate(injected);
		} catch (ex) {
			console.log(ex);
		}
	}

	useEffect(() => {
		if (error) {
			setLoading(false);
		}
		if (active) {
			setLoading(false);
			onHide();
		}
	}, [active, error]);

	const onCloseModal = () => {
		setLoading(false);
		onHide();
	};

	const renderHeader = () => {
		return <div className={styles.title}>Connect a wallet</div>;
	};

	const renderContent = () => {
		return (
			<div className={styles.connectWrapper}>
				{loading ? (
					<div>Loading ...</div>
				) : (
					<>
						{error ? <div>Error! Try again</div> : null}
						<button className={styles.wallet} onClick={connect}>
							<div className={styles.nameWrapper}>
								<div className={styles.name}>MetaMask</div>
							</div>
							<div className={styles.icon}>
								<img src="https://app.uniswap.org/static/media/metamask.02e3ec27.png" />
							</div>
						</button>
					</>
				)}
			</div>
		);
	};

	return (
		<div>
			{children}
			<Modal
				show={show}
				onHide={onCloseModal}
				header={renderHeader()}
				content={renderContent()}
			></Modal>
		</div>
	);
};

export default Login;
