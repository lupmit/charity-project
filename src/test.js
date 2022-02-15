// import React from "react";
// import { injected } from "./components/Wallet";
// import { useWeb3React } from "@web3-react/core";
// import Web3 from "web3";
// import json from "./contracts/Charity.json";

// const Test = () => {
// 	const { active, account, library, connector, activate, deactivate } =
// 		useWeb3React();

// 	async function connect() {
// 		try {
// 			await activate(injected);
// 		} catch (ex) {
// 			console.log(ex);
// 		}
// 	}

// 	async function disconnect() {
// 		try {
// 			deactivate();
// 		} catch (ex) {
// 			console.log(ex);
// 		}
// 	}

// 	const initContarct = async () => {
// 		const data = json;
// 		const contarct = new library.eth.Contract(
// 			data.abi,
// 			"0xEdD242836D5A9CF0c7C489e1F6A290Fb73171006"
// 		);
// 		return contarct;
// 	};
// 	console.log(library);

// 	const add = async () => {
// 		const contact = await initContarct();
// 		const res = await contact.methods
// 			.addManager("0x452bFfebe7E0D0C0Ee7FE3C3745881Ce34D039C3", "phuc", "test")
// 			.send({ from: account, gas: 3500000 });
// 		console.log(res);
// 		// const res = await contact.methods
// 		// 	.deleteManager("0x452bFfebe7E0D0C0Ee7FE3C3745881Ce34D039C3")
// 		// 	.send({ from: account, gas: 3500000 });
// 		// console.log(res);
// 	};
// 	const Delete = async () => {
// 		const contact = await initContarct();
// 		// const res = await contact.methods
// 		// 	.addManager("0x452bFfebe7E0D0C0Ee7FE3C3745881Ce34D039C3", "phuc", "test")
// 		// 	.send({ from: account, gas: 3500000 });
// 		// console.log(res);
// 		const res = await contact.methods
// 			.deleteManager("0x452bFfebe7E0D0C0Ee7FE3C3745881Ce34D039C3")
// 			.send({
// 				from: account,
// 				gas: 3500000,
// 			});
// 		console.log(res);
// 	};

// 	return (
// 		<div>
// 			<button onClick={connect}>Connect to MetaMask</button>
// 			{active ? (
// 				<span>
// 					Connected with <b>{account}</b>
// 				</span>
// 			) : (
// 				<span>Not connected</span>
// 			)}
// 			<button onClick={Delete}>Delete</button>
// 			<button onClick={add}>Add</button>
// 			<button onClick={disconnect}>Disconnect</button>
// 		</div>
// 	);
// };

// export default Test;
