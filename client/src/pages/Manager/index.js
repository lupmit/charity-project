import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import {
	addCharityProject,
	addManager,
	getAllProject,
	getMyProject,
	getProjectInfo,
} from "../../api/CharityApi";
import { donate, startCharity, addBeneficiary } from "../../api/ProjectApi";
import { getContract } from "../../helpers/Contract";
import { useWeb3React } from "@web3-react/core";
import { Link } from "react-router-dom";
import { CHARITY_CONTRACT_ADDRESS } from "../../config";
import Table from "../../components/Table";
import Modal from "../../components/Modal";

const Manager = () => {
	const { active, library, account } = useWeb3React();
	const [rerender, setRerender] = useState(false);
	const reRender = () => {
		setRerender(!rerender);
	};
	useEffect(() => {
		var timer = setInterval(() => reRender(), 5000);
		return () => clearInterval(timer);
	});

	const getcontract = async () => {
		return await getContract(library, CHARITY_CONTRACT_ADDRESS);
	};

	const startProject = async (address) => {
		console.log(address);
		const contract = await getContract(library, address, "Project");
		startCharity(contract, account)
			.then((res) => {
				console.log(res);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const addBeneficy = async (address) => {
		const contract = await getContract(library, address, "Project");
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

	////
	const columnsProject = [
		{
			name: "Address",
			selector: (row) => row.address,
		},
		{
			name: "Name",
			selector: (row) => row.name,
		},
		{
			name: "Desc",
			selector: (row) => row.desc,
		},
		{
			name: "Balance",
			selector: (row) => row.balance,
		},
		{
			name: "Target",
			selector: (row) => row.target,
		},
		{
			name: "Status",
			selector: (row) => row.status,
		},
		{
			name: "Action",
			selector: (row) =>
				row.status === "Setup" && (
					<div style={{ display: "flex", flexDirection: "column" }}>
						<button onClick={() => addBeneficy(row.address)}>
							Add Beneficy
						</button>
						<button onClick={() => startProject(row.address)}>Start</button>
					</div>
				),
			ignoreRowClick: true,
			allowOverflow: true,
			button: true,
		},
	];

	const getDataTable = (rawData) => {
		return rawData?.map((item) => {
			return {
				address: item.projectAddress,
				name: item.name,
				desc: item.description,
				balance: library.utils.fromWei(item.balance),
				target: library.utils.fromWei(item.target),
				status:
					item.state == 0 ? "Setup" : item.state == 1 ? "Running" : "Finnish",
			};
		});
	};
	///

	const [info, setInfo] = useState();
	const getInfo = (contract, address) => {
		return getProjectInfo(contract, address);
	};

	useEffect(() => {
		const getData = async () => {
			const projectInfo = [];
			const contract = await getcontract();
			const myProject = await getMyProject(contract, account);
			if (myProject.length < 1) return;
			myProject.forEach((element) => {
				projectInfo.push(getInfo(contract, element));
			});
			const data = await Promise.all(projectInfo);
			setInfo(data);
		};
		getData();
	}, [rerender]);

	///Modal Add Project
	const [showAddProject, setShowAddProject] = useState(false);

	const addProject = async (e) => {
		e.preventDefault();
		const contract = await getcontract();
		addCharityProject(
			contract,
			account,
			e.target[0].value,
			e.target[1].value,
			library.utils.toWei(e.target[2].value)
		)
			.then((res) => {
				setShowAddProject(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const hideAddProject = () => {
		setShowAddProject(false);
	};
	const showModalAddProject = () => {
		setShowAddProject(true);
	};
	return (
		<div>
			<Link to="/project">Let Go Project</Link>
			<h3>Your Project</h3>
			<button onClick={showModalAddProject}>Add Project</button>
			<Table columns={columnsProject} data={getDataTable(info)}></Table>
			<Modal
				show={showAddProject}
				onHide={hideAddProject}
				header={"Add Project"}
				content={
					<div>
						<form className={styles.form} onSubmit={addProject}>
							<span>Name</span>
							<input type="text" name="name" required />
							<span>Desc</span>
							<input type="text" name="desc" required />
							<span>Target</span>
							<input type="number" name="target" required />
							<button type="submit">Add Project</button>
						</form>
					</div>
				}
			></Modal>
		</div>
	);
};

export default Manager;
