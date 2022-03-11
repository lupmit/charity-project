import React from "react";
import ReactDOM from "react-dom";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-multi-carousel/lib/styles.css";

const getLibrary = (provider) => {
	const library = new Web3(provider);
	return library;
};

ReactDOM.render(
	<Web3ReactProvider getLibrary={getLibrary}>
		<App />
	</Web3ReactProvider>,
	document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
