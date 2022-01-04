import React, { useEffect, useState } from "react";
import * as _ from "lodash";
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
	const [filter, setFilter] = useState({});
	const [search, setSearch] = useState("");
	const { active } = useWeb3React();

	let library = useLibrary();

	const navigate = useNavigate();
	const donateClick = (address) => {
		navigate("/project/" + address);
	};

	const renderHeader = () => {
		return <div className={styles.modelFilterTitle}> Filter</div>;
	};
	const renderContent = () => {
		return (
			<div className={styles.filterContentWrapper}>
				<div className={styles.filterStatus}>
					<h4 className={styles.title}>Project Status</h4>
					<div className={styles.statuses}>
						<Button>All</Button>
						<Button>Funding</Button>
						<Button>Compeleted</Button>
					</div>
				</div>
			</div>
		);
	};

	const renderFooter = () => {
		return (
			<div className={styles.actionFilter}>
				<Button className={styles.reset}>Reset</Button>
				<Button className={styles.go}>Go</Button>
			</div>
		);
	};

	const handleFilterClick = () => {
		setOpenModal(true);
		setFilter({ a: 1 });
	};

	const handleClearFilter = () => {
		setFilter({});
	};

	////
	const [infoProject, setInfoProject] = useState();
	const [loading, setLoading] = useState(true);

	const getInfoProject = (contract, address) => {
		return getProjectInfo(contract, address);
	};

	useEffect(() => {
		const getData = async () => {
			const promise = [];
			let data = [];
			const contract = await getContract(library, getCharityAdress());
			const allProject = await getAllProject(contract);
			if (allProject.length >= 1) {
				allProject.forEach((element) => {
					promise.push(getInfoProject(contract, element));
				});
				data = await Promise.all(promise);
			}
			setInfoProject(data);
			setLoading(false);
		};
		getData();
	}, []);

	let projectShow = infoProject?.filter((item) => {
		return item.state > 0;
	});
	const getProjectHighlight = () => {
		if (projectShow) {
			const cloneArray = JSON.parse(JSON.stringify(projectShow));
			cloneArray.sort((a, b) => {
				return parseFloat(a[4]) < parseFloat(b[4])
					? 1
					: parseFloat(a[4]) === parseFloat(b[4])
					? parseFloat(a[3]) < parseFloat(b[3])
						? 1
						: -1
					: -1;
			});
			return cloneArray[0];
		}
		return;
	};

	//search
	let projectList = projectShow?.filter((item) => {
		let result = item.name
			.toLowerCase()
			.match(new RegExp(search.toLowerCase()));
		console.log(result);
		return result !== null && result.length > 0;
	});

	let hightlight = getProjectHighlight();
	return loading ? (
		<Loading />
	) : (
		<div className={styles.wrapper}>
			<div className={styles.headerDetail}>
				<img src="https://resource.binance.charity/images/3e39d9ef77344ad29feda41184add5b5_covidfitured.jpg" />
				<div class={styles.contentWrapper}>
					<div class={styles.content}>
						<h2 class={styles.name}>{hightlight[1]}</h2>
						<p class={styles.desc}>{hightlight[2]}</p>
						<div class={styles.footer}>
							<div class={styles.infoWrapper}>
								<div class={styles.valueWrapper}>
									<span class={styles.value}>{hightlight[5]}</span>
								</div>
								<div class={styles.key}>Donations</div>
							</div>
							<div class={styles.infoWrapper}>
								<div class={styles.valueWrapper}>
									<span class={styles.value}>
										{library.utils.fromWei(hightlight[4])} ETH
									</span>
									{/* <span class={styles.valueExtend}>≈ 78,810,466.7 USD</span> */}
								</div>
								<div class={styles.key}>Total Donations</div>
							</div>
							<button
								class={styles.button}
								onClick={() => donateClick(hightlight[0])}
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
						style={{ background: !_.isEmpty(filter) && "rgb(252, 213, 53)" }}
					>
						<GrFilter onClick={handleFilterClick} />
						<span onClick={handleFilterClick}>Filter</span>
						{_.isEmpty(filter) ? (
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
				header={renderHeader()}
				content={renderContent()}
				footer={renderFooter()}
			></Modal>
		</div>
	);
};

export default connect()(Project);
