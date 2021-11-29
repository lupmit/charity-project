import React from "react";
import { useParams } from "react-router-dom";
import { getContract } from "../../helpers/Contract";
import { useWeb3React } from "@web3-react/core";
import Tab from "../../components/Tab";
import { ProgressBar } from "react-bootstrap";
import styles from "./styles.module.scss";

const ProjectDetail = (props) => {
	const params = useParams();
	const address = params.address;

	const { library } = useWeb3React();

	const getcontract = async () => {
		return await getContract(library, address, "Project");
	};

	getcontract().then((res) => {
		console.log(res);
	});
	return (
		<div>
			<div className={styles.headerDetail}>
				<div className={styles.headerTop}>
					<div className={styles.headerLeft}>
						<h3 className={styles.name}>
							Pink Care Token Project for Period Poverty
						</h3>
						<div>
							<span className={styles.status}>FUNDING</span>
						</div>
					</div>
					<div className={styles.headerRight}>
						<button className={styles.buttonDonate}>Donate</button>
					</div>
				</div>
				<div className={styles.headerBottom}>
					<div className={styles.tile}>
						<h3>10</h3>
						<span>Donations</span>
					</div>
					<div className={styles.tile}>
						<h3>10</h3>
						<span>Individual Crypto Recipients</span>
					</div>
					<div className={styles.tile}>
						<h3>10</h3>
						<span>End-beneficiaries</span>
					</div>
					<div className={styles.progressWrapper}>
						<div className={styles.progress}>
							<div className={styles.progressTop}>
								<div className={styles.left}>683%</div>
								<div className={styles.right}>1000 ETH</div>
							</div>
							<div className={styles.progressContent}>
								<ProgressBar animated now={50} />
							</div>
							<div className={styles.progressBottom}>
								Crypto-donation Total: <b>59.314 ETH</b>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Tab address={address} className={styles.tab} />
		</div>
	);
};

export default ProjectDetail;
