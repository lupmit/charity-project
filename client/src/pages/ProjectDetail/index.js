import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getContract } from "../../helpers/Contract";
import { useWeb3React } from "@web3-react/core";
import { Tab, TabComponent } from "../../components/Tab";
import {
	getProjectInfo,
	getAllDonator,
	getAllTransactionBeneficiary,
} from "../../api/ProjectApi";
import { ProgressBar } from "react-bootstrap";
import Chart from "../../components/Chart";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import { getProjectByAddress } from "../../api/ServerApi";
import styles from "./styles.module.scss";
import { useLibrary } from "../../helpers/Hook";
import * as moment from "moment";
import Table from "../../components/Table";

const ProjectDetail = (props) => {
	const [info, setInfo] = useState();
	const [infoFromBE, setInfoFromBE] = useState();
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

			let promise = [];
			promise.push(getProjectInfo(contract));
			promise.push(getProjectByAddress(address));

			const res = await Promise.all(promise);
			setInfo(res[0]);
			setInfoFromBE(res[1].data.data);
			setLoading(false);
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
							y: parseFloat(library.utils.fromWei(item.allocated)),
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

	//Tab
	const [donatorRecord, setDonatorRecord] = useState([]);
	const [beneficyRecord, setBeneficyRecord] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const contract = await getcontract();
			getAllDonator(contract).then((res) => {
				setDonatorRecord(res);
			});
			getAllTransactionBeneficiary(contract).then((res) => {
				setBeneficyRecord(res);
			});
		};
		getData();
	}, []);

	const getDataDonator = (rawData) => {
		return rawData?.map((item) => {
			return {
				name: item.name,
				method: "Currency",
				currency: "ETH",
				amount: library.utils.fromWei(item.amount),
				message: item.message,
				time: moment.unix(item.timestamp).format("YYYY-MM-DD hh:mm:ss"),
			};
		});
	};

	const getDatabeneficy = (rawData) => {
		return rawData?.map((item) => {
			return {
				address: item.beneficiary.name,
				currency: "ETH",
				amount: library.utils.fromWei(item.amount),
				time: moment.unix(item.timestamp).format("YYYY-MM-DD hh:mm:ss"),
			};
		});
	};

	const getDataAllBeneficy = (rawData) => {
		return rawData.beneficiaries?.map((item) => {
			return {
				address: item.beneficiaryAddress,
				name: item.name,
				description: item.description,
			};
		});
	};

	const columnsDonator = [
		{
			name: "Name",
			selector: (row) => row.name,
		},
		{
			name: "Method",
			selector: (row) => row.method,
		},
		{
			name: "Currency",
			selector: (row) => row.currency,
		},
		{
			name: "Amount",
			selector: (row) => row.amount,
		},
		{
			name: "Message",
			selector: (row) => row.message,
		},
		{
			name: "Date",
			selector: (row) => row.time,
		},
	];

	const columnsBeneficy = [
		{
			name: "Receiver Name",
			selector: (row) => row.address,
		},
		{
			name: "Currency",
			selector: (row) => row.currency,
		},
		{
			name: "Amount",
			selector: (row) => row.amount,
		},
		{
			name: "Date",
			selector: (row) => row.time,
		},
	];
	const columnsAllBeneficy = [
		{
			name: "Wallet address",
			selector: (row) => row.address,
		},
		{
			name: "Full Name",
			selector: (row) => row.name,
		},
		{
			name: "Description",
			selector: (row) => row.description,
		},
	];

	return loading ? (
		<Loading />
	) : (
		<div className={styles.wrapper}>
			<div className={styles.headerWrapper}>
				<img src={`http://localhost:5000/${infoFromBE.image}`} />
				<div className={styles.contentWrapper}>
					<div className={styles.content}>
						<h5>{getStatus(info.state)}</h5>
						<h2>{info.name}</h2>
						<p>{infoFromBE.description} </p>
						<div className={styles.progressContent}>
							<ProgressBar
								animated
								now={
									((parseFloat(library.utils.fromWei(info.balance)) +
										parseFloat(library.utils.fromWei(info.allocated))) /
										parseFloat(library.utils.fromWei(info.target))) *
									100
								}
							/>
						</div>
						<div className={styles.infoDonate}>
							<span className={styles.balance}>
								{parseFloat(library.utils.fromWei(info.balance)) +
									parseFloat(library.utils.fromWei(info.allocated))}{" "}
								ETH
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
							<p>{infoFromBE.problem}</p>
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
									width="280px"
									height="280px"
									dataChart={getChartData(info)}
								/>
							</div>
							<div className={styles.chartTitle}>
								Total donated
								<span>
									{" "}
									{library.utils.fromWei(info.balance) +
										library.utils.fromWei(info.allocated)}{" "}
									ETH
								</span>
							</div>
							<div className={styles.allocated}>
								Total allocated{" "}
								<span> {library.utils.fromWei(info.allocated)} ETH</span>
							</div>
							<div className={styles.pending}>
								Total pending
								<span> {library.utils.fromWei(info.balance)} ETH</span>
							</div>
						</div>
					</div>
				</Container>
			</div>
			<div className={styles.information}>
				<Container>
					<h3 className={styles.title}>More Information</h3>
					<Tab address={address} className={styles.tab}>
						<TabComponent eventKey="desc" title="Project Description">
							<div
								dangerouslySetInnerHTML={{ __html: infoFromBE.infomation }}
							></div>
						</TabComponent>
						<TabComponent eventKey="all-benficy" title="All Beneficy">
							<Table
								data={getDataAllBeneficy(info)}
								columns={columnsAllBeneficy}
							/>
						</TabComponent>
						<TabComponent eventKey="donator" title="Donator Records">
							<Table
								data={getDataDonator(donatorRecord)}
								columns={columnsDonator}
							/>
						</TabComponent>
						<TabComponent eventKey="beneficy" title="Beneficy Records">
							<Table
								data={getDatabeneficy(beneficyRecord)}
								columns={columnsBeneficy}
							/>
						</TabComponent>
					</Tab>
				</Container>
			</div>
		</div>
	);
};

export default ProjectDetail;
