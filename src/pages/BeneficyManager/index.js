import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useWeb3React } from "@web3-react/core";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import Container from "../../components/Container";
import { useLibrary } from "../../helpers/Hook";
import Button from "../../components/Button";
import Search from "../../components/Search";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import {
	getAllBeneficy,
	deleteBeneficyByAddress,
	createOrUpdateBeneficy,
} from "../../api/ServerApi";
import Loading from "../../components/Loading";
import Input from "../../components/Input";
import * as _ from "lodash";
import Web3Token from "web3-token";

const BeneficyManager = () => {
	const { active, account } = useWeb3React();
	const [loading, setLoading] = useState(false);
	const [token, setToken] = useState();
	const [search, setSearch] = useState("");
	const [error, setError] = useState("");

	const handleClickDelete = async (address) => {
		deleteBeneficyByAddress(token, address).then(() => {
			setReRender(!reRender);
			setShowDeletebeneficy(false);
		});
	};

	const [data, setData] = useState([]);
	const [row, setRow] = useState();
	const [reRender, setReRender] = useState(true);

	const [showEditBeneficy, setShowEditBeneficy] = useState(false);

	const columnsBeneficy = [
		{
			name: "Địa chỉ ví",
			selector: (row) => row.address,
			width: "350px",
		},
		{
			name: "Họ và tên",
			selector: (row) => row.name,
		},
		{
			name: "Thông tin thêm",
			selector: (row) => row.description,
		},
		{
			name: "",
			selector: (row) => (
				<div className={styles.actionTable}>
					<AiOutlineEdit
						onClick={() => {
							setRow(row);
							setShowEditBeneficy(true);
						}}
					/>

					<AiOutlineDelete
						onClick={() => {
							setRow(row);
							setShowDeletebeneficy(true);
						}}
					/>
				</div>
			),
			ignoreRowClick: true,
			allowOverflow: true,
			button: true,
		},
	];

	const library = useLibrary();
	const navigate = useNavigate();

	useEffect(() => {
		if (!account) {
			return navigate("/");
		}
		const newToken = async () => {
			const newToken = await Web3Token.sign(
				(msg) => library.eth.personal.sign(msg, account),
				"1d"
			);
			localStorage.setItem("token", newToken);
			setToken(newToken);
		};
		let token = localStorage.getItem("token");
		if (!_.isEmpty(token)) {
			try {
				const { address, body } = Web3Token.verify(token);
				if (new Date(body["expiration-time"]) > new Date()) {
					setToken(token);
					return;
				}
			} catch (e) {
				console.log(e);
			}
		}
		newToken();
	}, [active]);

	useEffect(() => {
		setLoading(true);
		const getData = async () => {
			const res = await getAllBeneficy();
			setData(res.data.data);
			setLoading(false);
		};
		getData();
	}, [reRender]);

	const [showAddBeneficy, setShowAddBeneficy] = useState(false);

	const addBeneficy = async (e) => {
		e.preventDefault();
		if (!library.utils.isAddress(e.target[0].value)) {
			setError("Địa chỉ ví không hợp lệ!");
			return;
		}
		let arr = data.filter((item) => {
			return item.address === e.target[0].value;
		});

		if (!_.isEmpty(arr)) {
			setError("Địa chỉ ví đã tồn tại!");
			return;
		}

		const temp = {
			address: e.target[0].value,
			name: e.target[1].value,
			description: e.target[2].value,
		};
		createOrUpdateBeneficy(token, temp).then((res) => {
			setReRender(!reRender);
			setShowAddBeneficy(false);
			setError("");
		});
	};

	const updateBeneficy = async (e) => {
		e.preventDefault();
		if (!library.utils.isAddress(e.target[0].value)) {
			setError("Địa chỉ ví không hợp lệ!");
			return;
		}
		const temp = {
			address: e.target[0].value,
			name: e.target[1].value,
			description: e.target[2].value,
		};

		if (row.address !== temp.address) {
			deleteBeneficyByAddress(token, row.address);
		}
		createOrUpdateBeneficy(token, temp).then((res) => {
			setReRender(!reRender);
			setShowEditBeneficy(false);
			setError("");
		});
	};

	const [showDeletebeneficy, setShowDeletebeneficy] = useState(false);
	const hideDeleteBenficy = () => {
		setShowDeletebeneficy(false);
	};

	const hideAddBeneficy = () => {
		setShowAddBeneficy(false);
	};

	const searchFunction = (data, item) => {
		const keyword = item.toLowerCase();
		return data.filter(
			(x) =>
				x.address.toLowerCase().includes(keyword) ||
				x.name.toLowerCase().includes(keyword)
		);
	};

	let dataDisplay = _.cloneDeep(data);

	if (search && data) {
		console.log("search", searchFunction(data, search));
		dataDisplay = searchFunction(data, search);
	}

	//reset error
	useEffect(() => {
		setError("");
	}, [showAddBeneficy, showEditBeneficy]);

	return _.isEmpty(token) ? (
		<Loading />
	) : (
		<div className={styles.wrapper}>
			<Container>
				<h3 className={styles.title}>Người thụ hưởng</h3>
				<div className={styles.action}>
					<Button
						className={styles.add}
						onClick={() => setShowAddBeneficy(true)}
					>
						Thêm mới
					</Button>
					<Search
						className={styles.search}
						placeholder="Tìm kiếm"
						onChange={(event) => setSearch(event.target.value)}
					/>
				</div>
				<Table
					fixedHeader={true}
					fixedHeaderScrollHeight={"100%"}
					columns={columnsBeneficy}
					data={dataDisplay}
				></Table>
				<Modal
					show={showAddBeneficy}
					onHide={hideAddBeneficy}
					header={"Thêm mới"}
					content={
						<div>
							<form className={styles.form} onSubmit={addBeneficy}>
								{!_.isEmpty(error) && (
									<div style={{ color: "#ff3333" }}>{error}</div>
								)}
								<Input label="Địa chỉ ví" name="address" required />
								<Input label="Họ và tên" name="name" required />
								<Input label="Thông tin thêm" name="desc" required />

								<div className={styles.modalAction}>
									<Button type="submit">Lưu</Button>
									<Button
										typeButton="action"
										type="button"
										onClick={hideAddBeneficy}
									>
										Hủy
									</Button>
								</div>
							</form>
						</div>
					}
				></Modal>
				{row && (
					<>
						<Modal
							show={showEditBeneficy}
							onHide={() => setShowEditBeneficy(false)}
							header={"Thay đổi"}
							content={
								<div>
									<form className={styles.form} onSubmit={updateBeneficy}>
										{!_.isEmpty(error) && (
											<div style={{ color: "#ff3333" }}>{error}</div>
										)}
										<Input
											label="Địa chỉ ví"
											name="address"
											defaultValue={row.address}
											required
										/>
										<Input
											label="Họ và tên"
											name="name"
											defaultValue={row.name}
											required
										/>
										<Input
											label="Thông tin thêm"
											name="desc"
											defaultValue={row.description}
											required
										/>

										<div className={styles.modalAction}>
											<Button type="submit">Lưu</Button>
											<Button
												typeButton="action"
												type="button"
												onClick={() => setShowEditBeneficy(false)}
											>
												Hủy
											</Button>
										</div>
									</form>
								</div>
							}
						></Modal>
						<Modal
							show={showDeletebeneficy}
							onHide={hideDeleteBenficy}
							header={"Delete Beneficy"}
							content={
								<div className={styles.deleteGroup}>
									<div className={styles.content}>
										Bạn có chắc chắn muốn xóa?
									</div>
									<div className={styles.modalAction}>
										<Button onClick={() => handleClickDelete(row.address)}>
											Xóa
										</Button>
										<Button typeButton="action" onClick={hideDeleteBenficy}>
											Hủy
										</Button>
									</div>
								</div>
							}
						></Modal>
					</>
				)}
			</Container>
		</div>
	);
};

export default BeneficyManager;
