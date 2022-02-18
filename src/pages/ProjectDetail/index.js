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
// import ReactToPdf from "react-to-pdf";
import ReactToPrint from "react-to-print";
import * as moment from "moment";
import Table from "../../components/Table";
import EthIcon from "../../assets/images/icon-eth.png";

const ProjectDetail = (props) => {
	const ref = React.useRef(null);
	const [info, setInfo] = useState();
	const [infoFromBE, setInfoFromBE] = useState();
	const [loading, setLoading] = useState(true);
	const [onPrint, setOnPrint] = useState(false);
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
			return "Chưa diễn ra";
		} else if (status === 1) {
			return "Đang diễn ra";
		} else {
			return "Đã kết thúc";
		}
	};

	const reactToPrintContent = React.useCallback(() => {
		return ref.current;
	}, [ref.current]);

	const reactToPrintTrigger = React.useCallback(() => {
		return (
			<Button className={styles.download} typeButton="outline">
				Sao kê
			</Button>
		);
	}, []);

	const onBeforeGetContentResolve = React.useRef(null);

	const handleOnBeforeGetContent = React.useCallback(() => {
		return new Promise((resolve) => {
			onBeforeGetContentResolve.current = resolve;

			setTimeout(() => {
				setOnPrint(true);
				resolve();
			}, 2000);
		});
	}, []);

	const handleAfterPrint = React.useCallback(() => {
		setOnPrint(false);
	}, []);

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
	}, [address]);

	const donateClick = () => {
		navigate(location.pathname + "/donate");
	};

	const getChartData = (item) => {
		let allocated = parseFloat(library.utils.fromWei(item.allocated));
		let balance = parseFloat(library.utils.fromWei(item.balance));
		let target = parseFloat(library.utils.fromWei(item.target));

		return {
			series: [
				{
					data: [
						{
							y: allocated,
							color: "#6fcf97",
						},
						{
							y: balance,
							color: "#f0b90b",
						},
						{
							y: target - (allocated + balance),
							color: "#f5f5f5",
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
				method: "Tiền số",
				currency: "ETH",
				amount: library.utils.fromWei(item.amount),
				message: item.message,
				time: moment.unix(item.timestamp).format("YYYY-MM-DD hh:mm"),
			};
		});
	};

	const getDatabeneficy = (rawData) => {
		return rawData?.map((item) => {
			return {
				address: item.beneficiary.name,
				currency: "ETH",
				amount: library.utils.fromWei(item.amount),
				time: moment.unix(item.timestamp).format("YYYY-MM-DD hh:mm"),
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
			name: "Người quyên góp",
			selector: (row) => row.name,
			width: "200px",
		},
		{
			name: "Phương thức",
			selector: (row) => row.method,
		},
		{
			name: "Loại tiền",
			selector: (row) => (
				<div className={styles.currencyTable}>
					<img src={EthIcon} />
					ETH
				</div>
			),
		},
		{
			name: "Số lượng",
			selector: (row) => row.amount,
		},
		{
			name: "Lời nhắn",
			selector: (row) => row.message,
			width: "250px",
		},
		{
			name: "Thời gian",
			selector: (row) => row.time,
			width: "150px",
		},
	];

	const columnsBeneficy = [
		{
			name: "Người nhận",
			selector: (row) => row.address,
		},
		{
			name: "Loại tiền",
			selector: (row) => (
				<div className={styles.currencyTable}>
					<img src={EthIcon} />
					ETH
				</div>
			),
		},
		{
			name: "Số lượng",
			selector: (row) => row.amount,
		},
		{
			name: "Thời gian",
			selector: (row) => row.time,
		},
	];
	const columnsAllBeneficy = [
		{
			name: "Đại chỉ ví",
			selector: (row) => row.address,
			width: "400px",
		},
		{
			name: "Họ và tên",
			selector: (row) => row.name,
			width: "300px",
		},
		{
			name: "Thông tin",
			selector: (row) => row.description,
			width: "300px",
		},
	];

	let floatBalance = 0,
		floatAllocated = 0,
		floatTarget = 0;
	if (!loading) {
		floatBalance = parseFloat(library.utils.fromWei(info.balance));
		floatAllocated = parseFloat(library.utils.fromWei(info.allocated));
		floatTarget = parseFloat(library.utils.fromWei(info.target));
	}

	const pageStyle = "@page { size: A3}";

	return loading ? (
		<Loading />
	) : (
		<div className={styles.wrapper} ref={ref}>
			<div className={styles.headerWrapper}>
				<img src={infoFromBE.image} />
				<div className={styles.contentWrapper}>
					<div className={styles.content}>
						<h5>{getStatus(info.state)}</h5>
						<h2>{info.name}</h2>
						<p>{infoFromBE.description} </p>
						<div className={styles.progressContent}>
							<ProgressBar
								animated
								now={((floatBalance + floatAllocated) / floatTarget) * 100}
							/>
						</div>
						<div className={styles.infoDonate}>
							<span className={styles.balance}>
								{floatBalance + floatAllocated} ETH
							</span>
							<span className={styles.target}>mục tiêu {floatTarget} ETH</span>
						</div>
						<div className={styles.action}>
							{parseInt(info.state) === 2 ? (
								<ReactToPrint
									content={reactToPrintContent}
									trigger={reactToPrintTrigger}
									onAfterPrint={handleAfterPrint}
									onBeforeGetContent={handleOnBeforeGetContent}
									pageStyle={pageStyle}
								/>
							) : (
								<Button className={styles.donate} onClick={donateClick}>
									Quyên góp
								</Button>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.problemWrapper}>
				<Container>
					<h3 className={styles.title}>Vấn đề gặp phải?</h3>
					<div className={styles.mainContent}>
						<div className={styles.leftContent}>
							<p>{infoFromBE.problem}</p>
							<ul className={styles.info}>
								<li className={styles.item}>
									<span className={styles.value}>{info.numberOfDonator}</span>
									<span className={styles.key}>Người đóng góp</span>
								</li>
								<li className={styles.item}>
									<span className={styles.value}>{info.numberOfBeneficy}</span>
									<span className={styles.key}>Người thụ hưởng</span>
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
								Số tiền đã đóng góp
								<span> {floatBalance + floatAllocated} ETH</span>
							</div>
							<div className={styles.allocated}>
								Số tiền đã được gửi đi
								<span style={{ marginLeft: "5px" }}>{floatAllocated} ETH</span>
							</div>
							<div className={styles.pending}>
								Số tiền đang gửi
								<span style={{ marginLeft: "5px" }}>{floatBalance} ETH</span>
							</div>
						</div>
					</div>
				</Container>
			</div>
			<div className={styles.information}>
				{onPrint ? (
					<Container>
						<div style={{ fontWeight: 600, fontSize: "20px" }}>
							Thông tin thêm
						</div>
						<div
							dangerouslySetInnerHTML={{ __html: infoFromBE.infomation }}
						></div>

						<div style={{ fontWeight: 600, fontSize: "20px" }}>
							Danh sách đóng góp
						</div>
						<Table
							data={getDataDonator(donatorRecord)}
							columns={columnsDonator}
							pagination={false}
						/>

						<div style={{ fontWeight: 600, fontSize: "20px" }}>
							Danh sách đã gửi
						</div>
						<Table
							data={getDatabeneficy(beneficyRecord)}
							columns={columnsBeneficy}
							pagination={false}
						/>
					</Container>
				) : (
					<Container>
						<h3 className={styles.title}>Thông tin thêm</h3>
						<Tab address={address} className={styles.tab}>
							<TabComponent eventKey="desc" title="Thông tin dự án">
								<div
									style={{ paddingTop: "20px" }}
									dangerouslySetInnerHTML={{ __html: infoFromBE.infomation }}
								></div>
							</TabComponent>
							<TabComponent eventKey="all-benficy" title="Người thụ hưởng">
								<Table
									data={getDataAllBeneficy(info)}
									columns={columnsAllBeneficy}
								/>
							</TabComponent>
							<TabComponent eventKey="donator" title="Danh sách đóng góp">
								<Table
									data={getDataDonator(donatorRecord)}
									columns={columnsDonator}
								/>
							</TabComponent>
							<TabComponent eventKey="beneficy" title="Danh sách đã gửi">
								<Table
									data={getDatabeneficy(beneficyRecord)}
									columns={columnsBeneficy}
								/>
							</TabComponent>
						</Tab>
					</Container>
				)}
			</div>
		</div>
	);
};

export default ProjectDetail;
