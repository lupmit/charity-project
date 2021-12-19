import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getContract } from "../../helpers/Contract";
import { useWeb3React } from "@web3-react/core";
import Tab from "../../components/Tab";
import { getProjectInfo } from "../../api/ProjectApi";
import { ProgressBar } from "react-bootstrap";
import Chart from "../../components/Chart";
import styles from "./styles.module.scss";

const ProjectDetail = (props) => {
	const [info, setInfo] = useState();
	const params = useParams();
	const address = params.address;

	const navigate = useNavigate();
	const location = useLocation();

	const { library } = useWeb3React();

	const getcontract = async () => {
		return await getContract(library, address, "Project");
	};

	useEffect(() => {
		const getData = async () => {
			const contract = await getcontract();
			getProjectInfo(contract).then((res) => {
				setInfo(res);
			});
		};
		getData();
	}, []);

	console.log(info);

	const donateClick = () => {
		navigate(location.pathname + "/donate");
	};
	return (
		<div>
			{info && (
				<>
					<div className={styles.headerDetail}>
						<div className={styles.headerTop}>
							<div className={styles.headerLeft}>
								<h3 className={styles.name}>{info.name}</h3>
								<div>
									<span className={styles.status}>
										{info.state == 1 ? "RUNNING" : "FINNISH"}
									</span>
								</div>
							</div>
							<div className={styles.headerRight}>
								<button
									className={styles.buttonDonate}
									disabled={info.state != 1}
									onClick={donateClick}
								>
									Donate
								</button>
							</div>
						</div>
						<div className={styles.headerBottom}>
							<div className={styles.tile}>
								<h3>{info.numberOfDonator}</h3>
								<span>Donations</span>
							</div>
							<div className={styles.tile}>
								<h3>{info.numberOfBeneficy}</h3>
								<span>Individual Crypto Recipients</span>
							</div>
							<div className={styles.tile}>
								<h3>{info.numberOfBeneficy}</h3>
								<span>End-beneficiaries</span>
							</div>
							<div className={styles.progressWrapper}>
								<div className={styles.progress}>
									<div className={styles.progressTop}>
										<div className={styles.left}>
											{(info.balance / info.target) * 100}%
										</div>
										<div className={styles.right}>
											{library.utils.fromWei(info.target)} ETH
										</div>
									</div>
									<div className={styles.progressContent}>
										<ProgressBar
											animated
											now={(info.balance / info.target) * 100}
										/>
									</div>
									<div className={styles.progressBottom}>
										Crypto-donation Total:
										<b> {library.utils.fromWei(info.balance)} ETH</b>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={styles.chart}>
						<Chart />
					</div>
					<Tab address={address} className={styles.tab} />
				</>
			)}
		</div>
	);
};

export default ProjectDetail;
