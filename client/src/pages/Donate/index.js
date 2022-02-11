import React from "react";
import { useParams } from "react-router-dom";
import { getContract } from "../../helpers/Contract";
import { donate } from "../../api/ProjectApi";
import { useWeb3React } from "@web3-react/core";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import { getProjectInfo } from "../../api/ProjectApi";
import styles from "./styles.module.scss";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Login from "../../components/Login";
import { useLibrary } from "../../helpers/Hook";
import { getProjectByAddress } from "../../api/ServerApi";
import Modal from "../../components/Modal";
import Input from "../../components/Input";

const Donate = () => {
	const navigate = useNavigate();
	const params = useParams();
	const address = params.address;

	const { account, error, active } = useWeb3React();
	const library = useLibrary();

	const [info, setInfo] = useState();
	const [info1, setInfo1] = useState();
	const [loading, setLoading] = useState(true);

	const [swap, setSwap] = useState(false);

	const [show, setShow] = useState(false);

	const onHide = () => {
		setShow(false);
	};

	const getcontract = async () => {
		return await getContract(library, address, "Project");
	};

	useEffect(() => {
		const getData = async () => {
			const contract = await getcontract();
			await Promise.all([
				getProjectInfo(contract).then((res) => {
					setInfo(res);
				}),
				getProjectByAddress(address).then((res) => {
					console.log(res);
					setInfo1(res.data.data);
				}),
			]);
		};
		getData().then((res) => {
			setLoading(false);
		});
	}, []);

	const handleSumit = async (e) => {
		e.preventDefault();
		const contract = await getcontract();
		console.log(account);
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

	if (parseInt(info?.state) !== 1) {
		navigate("/project/" + address);
	}

	return loading ? (
		<Loading />
	) : (
		<div className={styles.donateWrapper}>
			<Container>
				<div className={styles.donateContent}>
					<div className={styles.left}>
						<div className={styles.leftContent}>
							<div className={styles.top}>
								<img
									src={`http://localhost:5000/${info1.image}`}
									alt="Pink Care Token Project for Period Poverty"
								/>
							</div>
							<div className={styles.bottom}>
								<div className={styles.content}>
									<h3>{info.name}</h3>
									<p>{info.description}</p>
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
									<Input label="Name" name="name"></Input>
									<Input label="Description" name="desc"></Input>
									<Input label="Amount" name="amount"></Input>
									{active ? (
										<div className={styles.buttonDonate}>
											<Button type="submit">Proceed to donation</Button>
										</div>
									) : (
										<Login show={show} onHide={onHide}>
											<div className={styles.buttonDonate}>
												<Button onClick={() => setShow(true)}>
													Connect Wallet
												</Button>
											</div>
										</Login>
									)}
								</form>
								<Button onClick={() => setSwap(true)}>Swap Token</Button>
							</div>
						</div>
					</div>
				</div>
				<Modal
					onHide={() => {
						setSwap(false);
					}}
					show={swap}
					content={
						<iframe
							src="https://app.uniswap.org/#/swap?exactField=input&exactAmount=10&inputCurrency=0x6b175474e89094c44da98b954eedeac495271d0f"
							height="500px"
							width="100%"
							style={{
								border: 0,
								margin: "0 auto",
								marginBottom: ".5rem",
								display: "block",
								borderRadius: "10px",
								maxWidth: "960px",
								minWidth: "300px",
							}}
						></iframe>
					}
				></Modal>
			</Container>
		</div>
	);
};

export default Donate;
