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
import EthIcon from "../../assets/images/icon-eth.png";
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
								<img src={info1.image} alt="" />
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
								<h3>Quyên góp để giúp đỡ</h3>
							</div>
							<div className={styles.form}>
								<form onSubmit={handleSumit}>
									<Input label="Họ và tên" name="name" required></Input>
									<Input label="Lời nhắn" name="desc" required></Input>
									<div className={styles.amountGroup}>
										<Input label="Số lượng" name="amount" required></Input>
										<div className={styles.logoGroup}>
											<img src={EthIcon} /> <span> ETH</span>
										</div>
									</div>
									{active ? (
										<div className={styles.buttonDonate}>
											<Button type="submit">Quyên góp</Button>
										</div>
									) : (
										<Login show={show} onHide={onHide}>
											<div className={styles.buttonDonate}>
												<Button type="button" onClick={() => setShow(true)}>
													Kết nối với ví
												</Button>
											</div>
										</Login>
									)}
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
