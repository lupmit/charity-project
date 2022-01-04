import React, { useEffect, useState } from "react";
import { getAllManager, addManager } from "../../api/CharityApi";
import { donate, startCharity, addBeneficiary } from "../../api/ProjectApi";
import { getContract, getCharityAdress } from "../../helpers/Contract";
import { useWeb3React } from "@web3-react/core";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

const Admin = () => {
	const { active, library, account } = useWeb3React();

	const [manager, setManager] = useState();

	console.log(library.utils);

	const getcontract = async () => {
		return await getContract(library, getCharityAdress());
	};
	const addmanager = async (e) => {
		e.preventDefault();
		const contract = await getcontract();
		const res = await addManager(
			contract,
			account,
			e.target[0].value,
			e.target[1].value,
			e.target[2].value
		);

		console.log(res);
	};
	useEffect(() => {
		const getdata = async () => {
			const contract = await getcontract();
			const res = await getAllManager(contract);

			setManager(res);
		};
		getdata();
	}, []);

	console.log(manager);
	return (
		<div>
			<h3>Add Manager</h3>
			<form className={styles.form} onSubmit={addmanager}>
				<span>Address</span>
				<input type="text" name="address" required />
				<span>Name</span>
				<input type="text" name="name" required />
				<span>Desc</span>
				<input type="text" name="desc" required />
				<button type="submit">Add Project</button>
			</form>
		</div>
	);
};

export default Admin;
