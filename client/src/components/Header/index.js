import React, { useState } from "react";
import Container from "../Container";
import { Link } from "react-router-dom";
import Button from "../Button";
import Login from "../Login";
import styles from "./styles.module.scss";
import { useWeb3React } from "@web3-react/core";

const Header = (props) => {
	const [show, setShow] = useState(false);
	const { active, account, library } = useWeb3React();

	const onHide = () => {
		setShow(false);
	};

	const getShort = (address) => {
		let head = address.substr(0, 6);
		let tail = address.substr(-4, 4);
		return head + "..." + tail;
	};
	return (
		<div className={styles.wrapper}>
			<Container>
				<div className={styles.header}>
					<div className={styles.logo}>
						<Link to="/">Charity Project</Link>
					</div>
					<ul className={styles.navLink}>
						<Link to="/project">
							<li className={styles.link}>Project</li>
						</Link>
						<Link to="/manager">
							<li className={styles.link}>Manager</li>
						</Link>
						<Link to="/admin">
							<li className={styles.link}>Admin</li>
						</Link>
					</ul>
					{console.log(library)}
					<div className={styles.action}>
						{active ? (
							<Button typeButton="outline" className={styles.button}>
								{getShort(account)}
							</Button>
						) : (
							<Login show={show} onHide={onHide}>
								<Button onClick={() => setShow(true)} className={styles.button}>
									Connect Wallet
								</Button>
							</Login>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Header;
