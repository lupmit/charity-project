import React from "react";
import { useWeb3React } from "@web3-react/core";
import { Navigate } from "react-router-dom";
import { injected } from "../../components/Wallet";
import { useLocation } from "react-router-dom";

const Login = () => {
	const { active, activate, deactivate } = useWeb3React();
	let location = useLocation();

	const from = location.state?.from?.pathname || "/";

	async function connect() {
		try {
			await activate(injected);
		} catch (ex) {
			console.log(ex);
		}
	}

	async function disconnect() {
		try {
			await deactivate();
		} catch (ex) {
			console.log(ex);
		}
	}

	return active ? (
		<Navigate to={from} />
	) : (
		<div style={{ paddingTop: "100px" }}>
			<button onClick={connect}>Connect to MetaMask</button>
			<button onClick={disconnect}>Disconnect</button>
		</div>
	);
};

export default Login;
