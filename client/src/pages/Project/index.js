import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import Container from "../../components/Container";
import Search from "../../components/Search";
import { GrFilter } from "react-icons/gr";
import { AiFillCaretDown } from "react-icons/ai";
import styles from "./styles.module.scss";

const Project = () => {
	return (
		<Container>
			<Row className={styles.filterGroup}>
				<Col sm={2} className={styles.filter}>
					<GrFilter />
					<span>Filter</span>
					<AiFillCaretDown />
				</Col>
				<Col sm={10} className={styles.search}>
					<Search
						placeholder="Search"
						onChange={(event) => console.log(event.target.value)}
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default Project;
