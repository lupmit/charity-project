import React, { useEffect, useState } from "react";
import Container from "../Container";
import { useNavigate, Link } from "react-router-dom";
import Button from "../Button";
import Login from "../Login";
import styles from "./styles.module.scss";
import Logo from "../../assets/images/logo.png";
import { Offcanvas } from "react-bootstrap";
import { getMyDonation } from "../../api/ProjectApi";
import { getContract } from "../../helpers/Contract";
import { getCharityAdress } from "../../helpers/Contract";
import { useWeb3React } from "@web3-react/core";
import { useLibrary } from "../../helpers/Hook";
import { getAllProject } from "../../api/CharityApi";
import { Dropdown } from "react-bootstrap";
import Modal from "../Modal";
import { roundNumber } from "../../utils/number";
import { shortAddress } from "../../utils/address";
import AddressComponent from "../Address";

const Header = ({ auth }) => {
	const [show, setShow] = useState(false);
	const [show1, setShow1] = useState(false);
	const [showHistory, setShowHistory] = useState(false);
	const { active, account, deactivate } = useWeb3React();
	const [history, setHistory] = useState();
	const [loading, setLoading] = useState(true);
	const [showManager, setShowManager] = useState(false);
	const [balance, setBalance] = useState(0);

	const library = useLibrary();
	const navigate = useNavigate();

	const onHide = () => {
		setShow(false);
	};

	useEffect(() => {
		const getData = async () => {
			const balance = await library.eth.getBalance(account);
			setBalance(balance);
		};

		if (active) {
			getData();
		}
	}, [active, account, showHistory]);

	useEffect(() => {
		if (!active) return;

		const getData = async () => {
			const contract = await getContract(library, getCharityAdress());
			const res = await getAllProject(contract, account);
			const promise = [];
			res.forEach(async (item) => {
				promise.push(
					getMyDonation(getContract(library, item, "Project"), account)
				);
			});
			const data = await Promise.all(promise);
			const newData = data.map((items, index) => {
				return items?.map((item) => {
					return (
						item && {
							...item,
							projectAddress: res[index],
						}
					);
				});
			});

			setHistory(newData);
		};
		getData().then((res) => {
			setLoading(false);
		});
	}, [active, account, showHistory]);

	const hanldeClickLogout = () => {
		try {
			deactivate();
			localStorage.clear();
			setShowHistory(false);
			setShow(false);
		} catch (e) {
			console.log(e);
		}
	};

	const handleClickHistory = (address) => {
		setShowHistory(false);
		navigate("/project/" + address);
	};

	const getContentHistory = () => {
		return (
			<div className={styles.accountModal}>
				<div className={styles.accountWrapper}>
					<div className={styles.titleWrapper}>
						<div className={styles.title}>Đã kết nối với ví MetaMask</div>
						<div>
							<Button
								className={styles.titleAction}
								onClick={() => {
									hanldeClickLogout();
								}}
							>
								Đăng xuất
							</Button>
						</div>
					</div>

					<div className={styles.contentWrapper}>
						<div>
							<div className={styles.iconWrapper}>
								<div
									style={{
										borderRadius: "50px",
										overflow: "hidden",
										padding: "0px",
										margin: "0px",
										width: "16px",
										height: "16px",
										display: "inline-block",
										background: "rgb(1, 142, 130)",
									}}
								>
									<svg x={0} y={0} width={16} height={16}>
										<rect
											x={0}
											y={0}
											width={16}
											height={16}
											transform="translate(4.696497994445773 -0.14742614139294938) rotate(463.1 8 8)"
											fill="#035B5E"
										/>
										<rect
											x={0}
											y={0}
											width={16}
											height={16}
											transform="translate(1.2326701799496997 -9.211461659814887) rotate(347.8 8 8)"
											fill="#C81462"
										/>
										<rect
											x={0}
											y={0}
											width={16}
											height={16}
											transform="translate(0.2187980126410665 14.49995620472078) rotate(244.3 8 8)"
											fill="#FB187B"
										/>
									</svg>
								</div>
							</div>
							{/* <p> {active ? shortAddress(account) : null}</p> */}
							<div className={styles.addressWrapper}>
								{active ? (
									<div className={styles.address}>
										<AddressComponent address={account} />
										<div className={styles.balance}>
											{roundNumber(library.utils.fromWei(`${balance}`))} ETH
										</div>
									</div>
								) : null}
							</div>
						</div>
					</div>

					<div className={styles.contentAction}>
						<a
							target="_blank"
							rel="noopener noreferrer"
							href={`https://kovan.etherscan.io/address/${account}`}
							className={styles.viewExplorer}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width={16}
								height={16}
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
								<polyline points="15 3 21 3 21 9" />
								<line x1={10} y1={14} x2={21} y2={3} />
							</svg>
							<span style={{ marginLeft: "4px" }}>Xem thêm trên EtherScan</span>
						</a>
					</div>
				</div>
				<div className={styles.historyWrapper}>
					<div className={styles.historyTitle}>Lịch sử quyên góp</div>
					<div className={styles.historyItemWrapper}>
						{history &&
							loading === false &&
							history.map((items) =>
								items.map(
									(item) =>
										item && (
											<div>
												<a
													className={styles.historyItem}
													onClick={() =>
														handleClickHistory(item.projectAddress)
													}
												>
													<div className={styles.titleWrapper}>
														<div className={styles.titleDonate}>
															{item.projectAddress} -{" "}
															{library.utils.fromWei(item[3])} ETH ↗
														</div>
													</div>
													<div className={styles.iconDone}>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width={16}
															height={16}
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															strokeWidth={2}
															strokeLinecap="round"
															strokeLinejoin="round"
														>
															<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
															<polyline points="22 4 12 14.01 9 11.01" />
														</svg>
													</div>
												</a>
											</div>
										)
								)
							)}
					</div>
				</div>
			</div>
		);
	};
	return (
		<div className={styles.wrapper}>
			<Container>
				<div className={styles.header}>
					<div className={styles.logo}>
						<Link to="/">
							<img src={Logo} />
						</Link>
					</div>
					<ul className={styles.navLink}>
						<Link to="/project">
							<li className={styles.link}>Dự án</li>
						</Link>
						<Link to="/explorer">
							<li className={styles.link}>Khám phá</li>
						</Link>
						<Link to="/swap">
							<li className={styles.link}>Hoán đổi</li>
						</Link>
						<Link to="/about">
							<li className={styles.link}>Giới thiệu</li>
						</Link>
						{auth ? (
							<>
								<Dropdown className={styles.dropdownGroup}>
									<Dropdown.Toggle className={styles.nav}>
										Quản lý
									</Dropdown.Toggle>

									<Dropdown.Menu className={styles.navMenu}>
										<Dropdown.Item
											className={styles.navItem}
											as={Link}
											to="/auth/project-manager"
										>
											Dự án
										</Dropdown.Item>
										<Dropdown.Item
											className={styles.navItem}
											as={Link}
											to="/auth/beneficy-manager"
										>
											Người thụ hưởng
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</>
						) : null}
						{/* <Link to="/admin">
							<li className={styles.link}>Admin</li>
						</Link> */}
					</ul>
					{console.log(library)}
					<div className={styles.action}>
						{active ? (
							<Button
								typeButton="outline"
								onClick={() => setShowHistory(true)}
								className={styles.button}
							>
								{shortAddress(account)}
							</Button>
						) : (
							<Login show={show} onHide={onHide}>
								<Button onClick={() => setShow(true)} className={styles.button}>
									Kết nối với ví điện tử
								</Button>
							</Login>
						)}
					</div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						className={styles.buttonOpenMenu}
						onClick={() => setShow1(true)}
					>
						<path
							d="M22 4H2v2h20V4zM22 11H2v2h20v-2zM22 18H2v2h20v-2z"
							fill="currentColor"
						></path>
					</svg>
				</div>

				<Modal
					show={showHistory}
					onHide={() => {
						setShowHistory(false);
					}}
					header={"Tài khoản"}
					content={getContentHistory()}
				></Modal>
				<Offcanvas
					show={show1}
					onHide={() => {
						setShow1(false);
					}}
					placement={"end"}
				>
					<Offcanvas.Body>
						<div className={styles.mobileWrapper}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								fill="none"
								onClick={() => setShow1(false)}
							>
								<path
									d="M14 12.676l-1.324 1.316-4.683-4.675L3.324 14l-1.316-1.324L6.676 8 2 3.324l1.324-1.317 4.669 4.676L12.676 2l1.31 1.324L9.315 8 14 12.676z"
									fill="currentColor"
								></path>
							</svg>
							<ul className={styles.navLink}>
								<Link to="/project" onClick={() => setShow1(false)}>
									<li className={styles.link}>Dự án</li>
								</Link>
								<Link to="/explorer" onClick={() => setShow1(false)}>
									<li className={styles.link}>Khám phá</li>
								</Link>
								<Link to="/swap" onClick={() => setShow1(false)}>
									<li className={styles.link}>Hoán đổi</li>
								</Link>
								<Link to="/about" onClick={() => setShow1(false)}>
									<li className={styles.link}>Giới thiệu</li>
								</Link>
								{auth ? (
									<li className={styles.linkGroup}>
										<div
											className={styles.groupTitle}
											onClick={() => setShowManager(!showManager)}
										>
											Quản lý
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="none"
												className={styles.iconDown}
											>
												<path
													d="M15.5 10.29v1.75L12 15.75l-3.5-3.71v-1.75h7z"
													fill="currentColor"
												></path>
											</svg>
										</div>
										{showManager && (
											<div className={styles.managerGroup}>
												<Link
													to="/auth/project-manager"
													onClick={() => setShow1(false)}
												>
													<li className={styles.linkItem}>Dự án</li>
												</Link>
												<Link
													to="/auth/beneficy-manager"
													onClick={() => setShow1(false)}
												>
													<li className={styles.linkItem}>Người thụ hưởng</li>
												</Link>
											</div>
										)}
									</li>
								) : null}
							</ul>
							<div className={styles.action}>
								{active ? (
									<Button
										onClick={() => setShowHistory(true)}
										typeButton="outline"
										className={styles.button}
									>
										{shortAddress(account)}
									</Button>
								) : (
									<Login show={show} onHide={onHide}>
										<Button
											onClick={() => setShow(true)}
											className={styles.button}
										>
											Kết nối với ví điện tử
										</Button>
									</Login>
								)}
							</div>
						</div>
					</Offcanvas.Body>
				</Offcanvas>
			</Container>
		</div>
	);
};

export default Header;
