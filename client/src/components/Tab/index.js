import React, { useEffect, useState } from "react";
import { Tab as TabComponent, Tabs } from "react-bootstrap";
import Table from "../Table";
import { useWeb3React } from "@web3-react/core";
import { getContract } from "../../helpers/Contract";
import {
	getAllDonator,
	getAllTransactionBeneficiary,
} from "../../api/ProjectApi";
import * as moment from "moment";
import styles from "./styles.module.scss";
import { useLibrary } from "../../helpers/Hook";

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

const Tab = (props) => {
	const [donatorRecord, setDonatorRecord] = useState([]);
	const [beneficyRecord, setBeneficyRecord] = useState([]);
	const { address } = props;
	const library = useLibrary();

	useEffect(() => {
		const getData = async () => {
			const contract = await getContract(library, address, "Project");
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

	return (
		<Tabs
			defaultActiveKey="desc"
			id="uncontrolled-tab-example"
			className={styles.tabWrapper}
		>
			<TabComponent eventKey="desc" title="Project Description">
				<div>Test</div>
			</TabComponent>
			<TabComponent eventKey="donator" title="Donator Records">
				<Table data={getDataDonator(donatorRecord)} columns={columnsDonator} />
			</TabComponent>
			<TabComponent eventKey="beneficy" title="Beneficy Records">
				<Table
					data={getDatabeneficy(beneficyRecord)}
					columns={columnsBeneficy}
				/>
			</TabComponent>
		</Tabs>
	);
};

export default Tab;
