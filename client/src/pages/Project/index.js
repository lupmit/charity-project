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
import { getContract } from "../../helpers/Contract";
import { useWeb3React } from "@web3-react/core";

import { CHARITY_CONTRACT_ADDRESS } from "../../config";
import Loading from "../../components/Loading";

const Project = () => {
	const [openModal, setOpenModal] = useState(false);
	const [filter, setFilter] = useState({});
	const { active, library } = useWeb3React();

	console.log(library);

	// const projectReducer = useSelector((state) => state.projectReducer);
	// const dispatch = useDispatch();
	// useEffect(() => {
	// 	dispatch({ type: types.DATA_FETCH_STARTED });

	// 	const success = (data) => {
	// 		dispatch({ type: types.DATA_FETCH_SUCCESS, data });
	// 	};

	// 	const error = (error) => {
	// 		dispatch({ type: types.DATA_FETCH_FAILED, error });
	// 	};

	// 	const getData = async () => {
	// 		const contract = await getContract(library, CHARITY_CONTRACT_ADDRESS);

	// 		getAllProject(contract).then(success).catch(error);
	// 	};

	// 	getData();
	// }, [dispatch, library]);

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
			const contract = await getContract(library, CHARITY_CONTRACT_ADDRESS);
			const allProject = await getAllProject(contract);
			if (allProject.length < 1) return;
			allProject.forEach((element) => {
				promise.push(getInfoProject(contract, element));
			});
			const data = await Promise.all(promise);
			setInfoProject(data);
			setLoading(false);
		};
		getData();
	}, []);

	const projectShow = infoProject?.filter((item) => {
		return item.state > 0;
	});

	return loading ? (
		<Loading />
	) : (
		<div className={styles.wrapper}>
			<div className={styles.headerDetail}>
				<img src="https://resource.binance.charity/images/3e39d9ef77344ad29feda41184add5b5_covidfitured.jpg" />
				<div class={styles.contentWrapper}>
					<div class={styles.content}>
						<h2 class={styles.name}>Binance Charity Wallet</h2>
						<p class={styles.desc}>
							The Charity Wallet is designed for donors who do not specify the
							donation projects and allow BCF to distribute the fund
							accordingly. Our blockchain-based system will allow people to
							track the flow of financial transactions with transparency. Our
							team will perform professional and rigorous due diligence to
							select projects and on-ground collaborative organizations,
							ensuring that the social impact of each currency unit will be
							maximized. On behalf of the end-beneficiaries, we would like to
							express our thankfulness for your generosity.
						</p>
						<div class={styles.footer}>
							<div class={styles.infoWrapper}>
								<div class={styles.valueWrapper}>
									<span class={styles.value}>805</span>
								</div>
								<div class={styles.key}>Donations</div>
							</div>
							<div class={styles.infoWrapper}>
								<div class={styles.valueWrapper}>
									<span class={styles.value}>1,576.3 BTC</span>
									<span class={styles.valueExtend}>≈ 78,810,466.7 USD</span>
								</div>
								<div class={styles.key}>Total Donations</div>
							</div>
							<button class={styles.button}>Donate</button>
						</div>
					</div>
				</div>
			</div>
			<Container>
				<div className={styles.filterGroup}>
					<div
						className={styles.filter}
						style={{ background: !_.isEmpty(filter) && "rgb(252, 213, 53)" }}
						onClick={handleFilterClick}
					>
						<GrFilter />
						<span>Filter</span>
						{_.isEmpty(filter) ? (
							<AiFillCaretDown />
						) : (
							<AiOutlineClose onClick={handleClearFilter} />
						)}
					</div>
					<div className={styles.search}>
						<Search
							placeholder="Search"
							onChange={(event) => console.log(event.target.value)}
						/>
					</div>
				</div>
				<div className={styles.listProject}>
					{projectShow?.map((item, key) => {
						return <ProjectCard data={item} key={key} />;
					})}
				</div>
			</Container>
		</div>
	);
};

export default connect()(Project);
