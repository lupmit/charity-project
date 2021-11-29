import React from "react";
import styles from "./styles.module.scss";
import { addCharityProject, addManager } from "../../api/CharityApi";
import { donate, startCharity, addBeneficiary } from "../../api/ProjectApi";
import { getContract } from "../../helpers/Contract";
import { useWeb3React } from "@web3-react/core";
import { Link } from "react-router-dom";
import { CHARITY_CONTRACT_ADDRESS } from "../../config";

const Manager = () => {
	const { active, library, account } = useWeb3React();

	const getcontract = async () => {
		return await getContract(library, CHARITY_CONTRACT_ADDRESS);
	};

	const addProject = async (e) => {
		e.preventDefault();
		const contract = await getcontract();
		const res = await addCharityProject(
			contract,
			account,
			e.target[0].value,
			e.target[1].value,
			library.utils.toWei(e.target[2].value)
		);

		console.log(res);
	};

	const Start = async () => {
		const contract = await getContract(
			library,
			"0xEa1f061284b709E09409ff2042ae9dFB1D423906",
			"Project"
		);
		startCharity(contract, account)
			.then((res) => {
				console.log(res);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const Donate = async () => {
		const contract = await getContract(
			library,
			"0xEa1f061284b709E09409ff2042ae9dFB1D423906",
			"Project"
		);
		donate(
			contract,
			account,
			"phuc",
			"hello may cung",
			library.utils.toWei("3")
		)
			.then((res) => {
				console.log(res);
			})
			.catch((e) => {
				console.log(e);
			});
	};
	const Add = async () => {
		const contract = await getContract(
			library,
			"0xEa1f061284b709E09409ff2042ae9dFB1D423906",
			"Project"
		);
		addBeneficiary(contract, account, [
			["0x2EBb1962B741da7BF9153BB85E07894Db60598a3", "test", "desc"],
			["0x0f7C72BDaeaF50942b7cFa0C509c87Be06eF41f1", "test1", "desc"],
			["0x452bFfebe7E0D0C0Ee7FE3C3745881Ce34D039C3", "test2", "desc"],
			["0xEA1b428FD953cB21C15C6b57b6251cfc253A815e", "test3", "desc"],
		])
			.then((res) => {
				console.log(res);
			})
			.catch((e) => {
				console.log(e);
			});
	};
	console.log(library.utils);
	return (
		<div>
			<Link to="/project">Let Go Project</Link>
			<h3>Add Project</h3>
			<form className={styles.form} onSubmit={addProject}>
				<span>Name</span>
				<input type="text" name="name" required />
				<span>Desc</span>
				<input type="text" name="desc" required />
				<span>Target</span>
				<input type="number" name="target" required />
				<button type="submit">Add Project</button>
			</form>
			<button onClick={Add}>Add beneficy</button>
			<button onClick={Start}>Start</button>
			<button onClick={Donate}>Donate</button>
		</div>
	);
};

export default Manager;
