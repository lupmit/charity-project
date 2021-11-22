import React from "react";
import { Tab as TabComponent, Tabs } from "react-bootstrap";
import Table from "../Table";
import styles from "./styles.module.scss";

const columns = [
	{
		name: "Title",
		selector: (row) => row.title,
	},
	{
		name: "Director",
		selector: (row) => row.director,
	},
	{
		name: "Year",
		selector: (row) => row.year,
	},
];

const data = [
	{
		title: <button>Donate</button>,
		director: "sdfsdfsdfsdf",
		year: "sdfsdfsdfsdf",
	},
	{
		title: "hahahaha",
		director: "sdfsdfsdfsdf",
		year: "sdfsdfsdfsdf",
	},
	{
		title: "hahahaha",
		director: "sdfsdfsdfsdf",
		year: "sdfsdfsdfsdf",
	},
	{
		title: "hahahaha",
		director: "sdfsdfsdfsdf",
		year: "sdfsdfsdfsdf",
	},
];

const Tab = () => {
	return (
		<Tabs
			defaultActiveKey="home"
			id="uncontrolled-tab-example"
			className={styles.tabWrapper}
		>
			<TabComponent eventKey="home" title="Home">
				<Table data={data} columns={columns} />
			</TabComponent>
			<TabComponent eventKey="profile" title="Profile">
				<div>
					[UPDATE: June 16, 2021] Crypto4Good organise une collecte de dons en
					partenariat avec Binance Charity. L'ensemble des fonds récoltés sera
					utilisé pour acheter un maximum de nourriture et de produits de
					première nécessité. Tous ces produits seront donnés aux associations
					sociales dans 5 villes de France. Pour participer il vous suffit de
					donner à cette cagnotte entre le 17 juin et le 22 juin Rejoignez nous
					en live sur Twitch pour le premier marathon de trading live caritatif
					en partenariat avec Binance. https://www.twitch.tv/cryptoforgood
					Retrouvez les informations sur l’ONG Crypto4Good en bas de page.{" "}
				</div>
			</TabComponent>
		</Tabs>
	);
};

export default Tab;
