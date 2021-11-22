import React, { useState } from "react";
import * as _ from "lodash";
import Search from "../../components/Search";
import ProjectCard from "../../components/ProjectCard";
import { GrFilter } from "react-icons/gr";
import { AiFillCaretDown } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./styles.module.scss";

const Project = () => {
	const [openModal, setOpenModal] = useState(false);
	const [filter, setFilter] = useState({});

	const handleFilterClick = () => {
		setOpenModal(true);
		setFilter({ a: 1 });
	};

	const handleClearFilter = () => {
		setFilter({});
	};

	const data = [
		{
			name: "phuc",
			desc: "hello",
			target: 100,
			amount: 50,
		},
		{
			name: "phuc",
			desc: "hello",
			target: 100,
			amount: 50,
		},
		{
			name: "phuc",
			desc: "hello",
			target: 100,
			amount: 50,
		},
		{
			name: "phuc",
			desc: "hello",
			target: 100,
			amount: 50,
		},
		{
			name: "phuc",
			desc: "hello",
			target: 100,
			amount: 50,
		},
	];

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
				{data?.map((item) => {
					return <ProjectCard />;
				})}
			</div>
		</div>
	);
};

export default Project;
