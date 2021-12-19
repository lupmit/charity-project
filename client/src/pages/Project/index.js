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

import types from "../../reducers/ProjectReducer/types";
import { getContract } from "../../helpers/Contract";
import { useWeb3React } from "@web3-react/core";

import { CHARITY_CONTRACT_ADDRESS } from "../../config";

const Project = () => {
	const [openModal, setOpenModal] = useState(false);
	const [filter, setFilter] = useState({});
	const { active, library } = useWeb3React();

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
		};
		getData();
	}, []);

	const projectShow = infoProject?.filter((item) => {
		return item.state > 0;
	});

	return (
		<div>
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
		</div>
	);
};

export default connect()(Project);
