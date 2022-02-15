import React, { useEffect, useState } from "react";
import * as _ from "lodash";
import { getProjectByAddress } from "../../api/ServerApi";
import Search from "../../components/Search";
import ProjectCard from "../../components/ProjectCard";
import { getAllProject, getProjectInfo } from "../../api/CharityApi";
import { connect, useSelector, useDispatch } from "react-redux";
import { GrFilter } from "react-icons/gr";
import { AiFillCaretDown } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./styles.module.scss";

import Container from "../../components/Container";
import { getContract, getCharityAdress } from "../../helpers/Contract";
import { useWeb3React } from "@web3-react/core";

import Loading from "../../components/Loading";
import { useLibrary } from "../../helpers/Hook";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const Project = () => {
	const [openModal, setOpenModal] = useState(false);
	const [filter, setFilter] = useState(0);
	const [applyFilter, setApplyFilter] = useState(0);
	const [search, setSearch] = useState("");
	const { active } = useWeb3React();

	let library = useLibrary();

	const navigate = useNavigate();
	const donateClick = (address) => {
		navigate("/project/" + address);
	};

	const renderContent = () => {
		return (
			<div className={styles.filterContentWrapper}>
				<div className={styles.filterStatus}>
					<h4 className={styles.title}>Project Status</h4>
					<div className={styles.statuses}>
						<Button
							onClick={() => {
								setFilter(0);
							}}
							style={{ background: filter === 0 && "rgb(252, 213, 53)" }}
						>
							All
						</Button>
						<Button
							onClick={() => {
								setFilter(1);
							}}
							style={{ background: filter === 1 && "rgb(252, 213, 53)" }}
						>
							Funding
						</Button>
						<Button
							onClick={() => {
								setFilter(2);
							}}
							style={{ background: filter === 2 && "rgb(252, 213, 53)" }}
						>
							Compeleted
						</Button>
					</div>
				</div>
			</div>
		);
	};

	const renderFooter = () => {
		return (
			<div className={styles.actionFilter}>
				<Button
					className={styles.reset}
					onClick={() => {
						onClickReset();
					}}
				>
					Reset
				</Button>
				<Button
					className={styles.go}
					onClick={() => {
						onClickGo();
					}}
				>
					Go
				</Button>
			</div>
		);
	};

	const onClickGo = () => {
		setApplyFilter(filter);
		setOpenModal(false);
	};

	const onClickReset = () => {
		setFilter(0);
		setApplyFilter(0);
		setOpenModal(false);
	};

	const handleFilterClick = () => {
		setOpenModal(true);
	};

	const handleClearFilter = () => {
		setFilter(0);
		setApplyFilter(0);
	};

	////
	const [infoProject, setInfoProject] = useState();
	const [loading, setLoading] = useState(true);

	const getInfoProject = (contract, address) => {
		return getProjectInfo(contract, address);
	};

	const ProjectInfoToObj = (projects) => {
		if (projects.length < 1) return [];
		return projects.map((item) => {
			return {
				projectAddress: item[0],
				name: item[1],
				target: item[2],
				balance: item[3],
				allocated: item[4],
				numberOfDonator: item[5],
				numberOfBeneficy: item[6],
				beneficiaries: item[7],
				state: item[8],
			};
		});
	};

	useEffect(() => {
		const getData = async () => {
			const promise1 = [];
			const promise2 = [];
			let data1 = [];
			let data2 = [];
			const contract = await getContract(library, getCharityAdress());
			const allProject = await getAllProject(contract);
			if (allProject.length >= 1) {
				allProject.forEach((element) => {
					promise1.push(getInfoProject(contract, element));
					promise2.push(getProjectByAddress(element));
				});
				data1 = await Promise.all(promise1);
				data1 = ProjectInfoToObj(data1);
				data2 = await Promise.all(promise2);
				data2 = data2.map((item) => item.data.data);
				if (!_.isEmpty(data1) && !_.isEmpty(data2)) {
					const data = _.map(data1, function (item) {
						return _.extend(
							item,
							_.find(data2, { address: item.projectAddress })
						);
					});
					setInfoProject(data);
				}
			}
		};
		getData().then((res) => {
			setLoading(false);
		});
	}, []);

	let projectShow = infoProject?.filter((item) => {
		return item.state > 0;
	});

	const getProjectHighlight = () => {
		if (projectShow) {
			const cloneArray = JSON.parse(JSON.stringify(projectShow));
			cloneArray.sort((a, b) => {
				return parseFloat(a.allocated) < parseFloat(b.allocated)
					? 1
					: parseFloat(a.allocated) === parseFloat(b.allocated)
					? parseFloat(a.balance) < parseFloat(b.balance)
						? 1
						: -1
					: -1;
			});
			return cloneArray;
		}
		return [];
	};

	let hightlight = getProjectHighlight();

	//search
	let projectList = projectShow?.filter((item) => {
		let result = item.name
			.toLowerCase()
			.match(new RegExp(search.toLowerCase()));
		if (applyFilter !== 0) {
			return (
				result !== null &&
				result.length > 0 &&
				parseInt(item.state) === applyFilter
			);
		}
		return result !== null && result.length > 0;
	});

	return loading || _.isEmpty(hightlight) ? (
		<Loading />
	) : (
		<div className={styles.wrapper}>
			<div className={styles.headerDetail}>
				<img src={hightlight[0].image} />
				<div className={styles.contentWrapper}>
					<div className={styles.content}>
						<h2 className={styles.name}>{hightlight[0].name}</h2>
						<p className={styles.desc}>{hightlight[0].description}</p>
						<div className={styles.footer}>
							<div className={styles.infoWrapper}>
								<div className={styles.valueWrapper}>
									<span className={styles.value}>
										{hightlight[0].numberOfDonator}
									</span>
								</div>
								<div className={styles.key}>Donations</div>
							</div>
							<div className={styles.infoWrapper}>
								<div className={styles.valueWrapper}>
									<span className={styles.value}>
										{parseFloat(library.utils.fromWei(hightlight[0].balance)) +
											parseFloat(
												library.utils.fromWei(hightlight[0].allocated)
											)}{" "}
										ETH
									</span>
									{/* <span className={styles.valueExtend}>≈ 78,810,466.7 USD</span> */}
								</div>
								<div className={styles.key}>Total Donations</div>
							</div>
							<button
								className={styles.button}
								onClick={() => donateClick(hightlight[0].address)}
							>
								Donate
							</button>
						</div>
					</div>
				</div>
			</div>
			<Container>
				<div className={styles.filterGroup}>
					<div
						className={styles.filter}
						style={{ background: applyFilter !== 0 && "rgb(252, 213, 53)" }}
					>
						<GrFilter onClick={handleFilterClick} />
						<span onClick={handleFilterClick}>Filter</span>
						{applyFilter === 0 ? (
							<AiFillCaretDown onClick={handleFilterClick} />
						) : (
							<AiOutlineClose onClick={handleClearFilter} />
						)}
					</div>
					<div className={styles.search}>
						<Search
							placeholder="Search"
							onChange={(event) => setSearch(event.target.value)}
						/>
					</div>
				</div>
				<div className={styles.listProject}>
					{projectList?.map((item, key) => {
						return <ProjectCard data={item} key={key} />;
					})}
				</div>
			</Container>
			<Modal
				show={openModal}
				onHide={() => {
					setOpenModal(false);
				}}
				header={"Filter"}
				content={renderContent()}
				footer={renderFooter()}
			></Modal>
		</div>
	);
};

export default connect()(Project);
