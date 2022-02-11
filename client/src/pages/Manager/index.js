import React, { useEffect, useState, useRef } from "react";
import styles from "./styles.module.scss";
import {
	addCharityProject,
	getAllProject,
	getProjectInfo,
} from "../../api/CharityApi";
import { donate, startCharity, addBeneficiary } from "../../api/ProjectApi";
import { getContract, getCharityAdress } from "../../helpers/Contract";
import { useWeb3React } from "@web3-react/core";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import Container from "../../components/Container";
import { useLibrary } from "../../helpers/Hook";
import Button from "../../components/Button";
import Search from "../../components/Search";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineCopy } from "react-icons/ai";
import EthIcon from "../../assets/images/icon-eth.png";
import { createOrUpdate } from "../../api/ServerApi";
import Loading from "../../components/Loading";
import Input from "../../components/Input";
import { deleteCharityProject } from "../../api/CharityApi";
import { deleteProjectByAddress } from "../../api/ServerApi";
import * as _ from "lodash";
import Web3Token from "web3-token";

const Manager = () => {
	const { active, account } = useWeb3React();
	const [loading, setLoading] = useState(false);
	const [rerender, setRerender] = useState(false);
	const [token, setToken] = useState();
	const [search, setSearch] = useState("");

	const navigate = useNavigate();
	const handleClickEdit = (address) => {
		navigate("/auth/project/" + address + "/edit");
	};

	const handleClickDelete = async (address) => {
		const contract = await getcontract();
		deleteCharityProject(contract, account, address).then(() => {
			setRerender(!rerender);
			deleteProjectByAddress(token, address);
		});
	};

	const handleCopyClick = (address) => {
		navigator.clipboard.writeText(address);
	};

	const library = useLibrary();

	useEffect(() => {
		if (!account) {
			return navigate("/");
		}
		const newToken = async () => {
			const newToken = await Web3Token.sign(
				(msg) => library.eth.personal.sign(msg, account),
				"1d"
			);
			localStorage.setItem("token", newToken);
			setToken(newToken);
		};
		let token = localStorage.getItem("token");
		if (!_.isEmpty(token)) {
			try {
				Web3Token.verify(token);
				setToken(token);
				return;
			} catch (e) {
				console.log(e);
			}
		}
		newToken();
	}, [active]);

	const getcontract = async () => {
		return await getContract(library, getCharityAdress());
	};

	const getShort = (address) => {
		let head = address.substr(0, 6);
		let tail = address.substr(-4, 4);
		return head + "..." + tail;
	};

	////
	const columnsProject = [
		{
			name: "Address",
			selector: (row) => (
				<div className={styles.addressTable}>
					{getShort(row.address)}
					<AiOutlineCopy onClick={() => handleCopyClick(row.address)} />
				</div>
			),
			maxWidth: "200px",
		},
		{
			name: "Name",
			selector: (row) => row.name,
			sortable: true,
		},
		{
			name: "Currency",
			selector: (row) => (
				<div className={styles.currencyTable}>
					<img src={EthIcon} />
					ETH
				</div>
			),
			maxWidth: "100px",
		},
		{
			name: "Balance",
			selector: (row) => row.balance,
			maxWidth: "100px",
			sortable: true,
		},
		{
			name: "Target",
			selector: (row) => row.target,
			maxWidth: "100px",
			sortable: true,
		},
		{
			name: "Status",
			selector: (row) => row.status,
			maxWidth: "100px",
			sortable: true,
		},
		{
			name: "Action",
			selector: (row) => (
				<div className={styles.actionTable}>
					<AiOutlineEdit onClick={() => handleClickEdit(row.address)} />
					{row.status === "Setup" && (
						<AiOutlineDelete onClick={() => handleClickDelete(row.address)} />
					)}
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
		setLoading(true);
		const getData = async () => {
			const projectInfo = [];
			const contract = await getcontract();
			const myProject = await getAllProject(contract);
			// console.log(myProject);
			if (myProject.length < 1) return;
			myProject.forEach((element) => {
				projectInfo.push(getInfo(contract, element));
			});
			const data = await Promise.all(projectInfo);
			setInfo(data.reverse());
			setLoading(false);
		};
		getData();
	}, [rerender]);

	///Modal Add Project
	const [showAddProject, setShowAddProject] = useState(false);

	const addProject = async (e) => {
		e.preventDefault();
		const contract = await getcontract();
		setShowAddProject(false);
		addCharityProject(
			contract,
			account,
			e.target[0].value,
			library.utils.toWei(e.target[1].value)
		)
			.then((res) => {
				setRerender(!rerender);
				let tempProject = {
					address: res.events.addCharityProjectEvent.returnValues[1],
					image: "",
					description: "",
					problem: "",
					infomation: "",
				};
				createOrUpdate(token, tempProject);
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
	return _.isEmpty(token) ? (
		<Loading />
	) : (
		<div className={styles.wrapper}>
			<Container>
				<h3 className={styles.title}>Projects</h3>
				<div className={styles.action}>
					<Button className={styles.add} onClick={showModalAddProject}>
						Add Project
					</Button>
					<Search
						className={styles.search}
						placeholder="Search"
						onChange={(event) => setSearch(event.target.value)}
					/>
				</div>
				<Table
					fixedHeader={true}
					fixedHeaderScrollHeight={"100%"}
					columns={columnsProject}
					data={getDataTable(info)}
					// progressPending={rerender}
					// progressComponent={<Loading style={{ height: "100%" }} />}
				></Table>
				<Modal
					show={showAddProject}
					onHide={hideAddProject}
					header={"Add Project"}
					content={
						<div>
							<form className={styles.form} onSubmit={addProject}>
								{/* <span>Name</span>
								<input type="text" name="name" required />
								<span>Target</span>
								<input type="number" name="target" required /> */}
								<Input label="Project name" name="name" required />
								<Input label="Target" name="target" required type="number" />
								<div className={styles.modalAction}>
									<Button type="submit">Save</Button>
									<Button typeButton="outline" type="submit">
										Cancel
									</Button>
								</div>
							</form>
						</div>
					}
				></Modal>
			</Container>
		</div>
	);
};

export default Manager;
