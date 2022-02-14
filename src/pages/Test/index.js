import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Login from "../../components/Login";

const Test = () => {
	const [show, setShow] = useState(false);

	const onHide = () => {
		setShow(false);
	};

	return (
		<div>
			<Login show={show} onHide={onHide}>
				<button onClick={() => setShow(true)}>Connect</button>
			</Login>
		</div>
	);
};

export default Test;
