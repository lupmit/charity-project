import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getContract } from "../../helpers/Contract";
import { useWeb3React } from "@web3-react/core";
import Tab from "../../components/Tab";
import { getProjectInfo } from "../../api/ProjectApi";
import { ProgressBar } from "react-bootstrap";
import Chart from "../../components/Chart";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import styles from "./styles.module.scss";
import { useLibrary } from "../../helpers/Hook";

const ProjectDetail = (props) => {
	const [info, setInfo] = useState();
	const [loading, setLoading] = useState(true);
	const params = useParams();
	const address = params.address;

	const navigate = useNavigate();
	const location = useLocation();

	const library = useLibrary();

	const getcontract = async () => {
		return await getContract(library, address, "Project");
	};

	const getStatus = (status) => {
		console.log(status);
		status = parseInt(status);
		if (status === 0) {
			return "Setup";
		} else if (status === 1) {
			return "Funding";
		} else {
			return "Compeleted";
		}
	};

	useEffect(() => {
		const getData = async () => {
			const contract = await getcontract();
			getProjectInfo(contract).then((res) => {
				setInfo(res);
				setLoading(false);
			});
		};
		getData();
	}, []);

	const donateClick = () => {
		navigate(location.pathname + "/donate");
	};

	const getChartData = (item) => {
		return {
			series: [
				{
					data: [
						{
							y: parseFloat(library.utils.fromWei(item.target)),
							color: "#6fcf97",
						},
						{
							y: parseFloat(library.utils.fromWei(item.balance)),
							color: "#f0b90b",
						},
					],
				},
			],
		};
	};

	return loading ? (
		<Loading />
	) : (
		<div className={styles.wrapper}>
			<div className={styles.headerWrapper}>
				<img src="https://resource.binance.charity/images/a5ded15f1fae4b47b55264374adc845a_WechatIMG701.jpeg" />
				<div className={styles.contentWrapper}>
					<div className={styles.content}>
						<h5>{getStatus(info.state)}</h5>
						<h2>{info.name}</h2>
						<p>{info.description} </p>
						<div className={styles.progressContent}>
							<ProgressBar animated now={(info.balance / info.target) * 100} />
						</div>
						<div className={styles.infoDonate}>
							<span className={styles.balance}>
								{library.utils.fromWei(info.balance)} ETH
							</span>
							<span className={styles.target}>
								Raised of {library.utils.fromWei(info.target)} ETH
							</span>
						</div>
						<div className={styles.action}>
							<Button className={styles.donate} onClick={donateClick}>
								Donate
							</Button>
							{info.status === 2 ? (
								<Button className={styles.download} typeButton="outline">
									Download
								</Button>
							) : null}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.problemWrapper}>
				<Container>
					<h3 className={styles.title}>What’s the problem?</h3>
					<div className={styles.mainContent}>
						<div className={styles.leftContent}>
							<p>
								The COVID-19 pandemic is the greatest health crisis of our time.
								It has killed more than 5 million people, destroyed livelihoods
								and shut down entire economies. As we near the end of 2021, the
								virus is still plaguing countries, whilst others - considered
								the luckier ones- begin to tackle the aftermath as they look to
								rebuild.
							</p>
							<ul className={styles.info}>
								<li className={styles.item}>
									<span className={styles.value}>{info.numberOfDonator}</span>
									<span className={styles.key}>Donors</span>
								</li>
								<li className={styles.item}>
									<span className={styles.value}>{info.numberOfBeneficy}</span>
									<span className={styles.key}>End-beneficiaries</span>
								</li>
							</ul>
						</div>
						<div className={styles.rightContent}>
							<div className={styles.chart}>
								<Chart
									width="300px"
									height="300px"
									dataChart={getChartData(info)}
								/>
							</div>
							<div className={styles.chartTitle}>
								Total donated
								<span> {library.utils.fromWei(info.balance)} ETH</span>
							</div>
							<div className={styles.allocated}>
								Total allocated <span>1 ETH</span>
							</div>
							<div className={styles.pending}>
								Total pending
								<span>2 ETH</span>
							</div>
						</div>
					</div>
				</Container>
			</div>
			<div className={styles.information}>
				<Container>
					<h3 className={styles.title}>More Information</h3>
					<Tab address={address} className={styles.tab} />
				</Container>
			</div>
		</div>
	);
};

export default ProjectDetail;
