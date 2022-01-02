import React from "react";
import { useParams } from "react-router-dom";
import { getContract } from "../../helpers/Contract";
import { donate } from "../../api/ProjectApi";
import { useWeb3React } from "@web3-react/core";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import styles from "./styles.module.scss";

const Donate = () => {
	const navigate = useNavigate();
	const params = useParams();
	const address = params.address;

	const { account, library, error } = useWeb3React();
	console.log(account);

	const getcontract = async () => {
		return await getContract(library, address, "Project");
	};
	const handleSumit = async (e) => {
		e.preventDefault();
		const contract = await getcontract();
		donate(
			contract,
			account,
			e.target[0].value,
			e.target[1].value,
			library.utils.toWei(e.target[2].value)
		)
			.then((res) => {
				navigate("/project/" + address);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	return (
		<div className={styles.donateWrapper}>
			<Container>
				<div className={styles.donateContent}>
					<div className={styles.left}>
						<div className={styles.leftContent}>
							<div className={styles.top}>
								<img
									src="https://resource.binance.charity/images/2cb9816b62254787a32e3fd34d59dea9_pinktoken.jpg"
									alt="Pink Care Token Project for Period Poverty"
								/>
							</div>
							<div className={styles.bottom}>
								<div className={styles.content}>
									<h3>Test</h3>
									<p>test</p>
								</div>
							</div>
						</div>
					</div>
					<div className={styles.right}>
						<div className={styles.rightContent}>
							<div className={styles.header}>
								<h3>Donate to help</h3>
							</div>
							<div className={styles.form}>
								<form onSubmit={handleSumit}>
									<span>Name</span>
									<input name="name"></input>
									<span>Description</span>
									<input name="desc"></input>
									<span>Amount</span>
									<input name="amount"></input>
									<div className={styles.buttonDonate}>
										<button type="submit">Proceed to donation</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Donate;
