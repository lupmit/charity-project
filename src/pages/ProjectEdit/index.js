import React, { useEffect, useState, useRef } from "react";
import Container from "../../components/Container";
import { getContract } from "../../helpers/Contract";
import { getProjectInfo } from "../../api/ProjectApi";
import { useParams } from "react-router-dom";
import { useLibrary } from "../../helpers/Hook";
import Loading from "../../components/Loading";
import Input from "../../components/Input";
import { AiFillCamera, AiOutlineClose } from "react-icons/ai";
import { createOrUpdate, uploadImage } from "../../api/ServerApi";
import Editor from "../../components/Editor";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Table from "../../components/Table";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { getProjectByAddress, getAllBeneficy } from "../../api/ServerApi";
import { updateAndStartCharity } from "../../api/ProjectApi";
import { useWeb3React } from "@web3-react/core";
import { useNavigate } from "react-router-dom";
import * as _ from "lodash";
import Web3Token from "web3-token";
import styles from "./styles.module.scss";
import TextArea from "../../components/TextArea";
import EthIcon from "../../assets/images/icon-eth.png";
import Autocomplete from "react-autocomplete";
import Autosuggest from "react-autosuggest";

const ProjectEdit = () => {
	const [info, setInfo] = useState();
	const [loading, setLoading] = useState(true);
	const [token, setToken] = useState();
	const [listBeneficy, setListBeneficy] = useState([]);
	const [sugget, setSugget] = useState([]);
	const params = useParams();
	const address = params.address;

	const { account, error } = useWeb3React();

	const navigate = useNavigate();

	//Change
	const [name, setName] = useState("");
	const [target, setTarget] = useState();
	const [desc, setDesc] = useState("");
	const [problem, setProblem] = useState("");
	const [infomation, setInfomation] = useState("");
	const [image, setImage] = useState();

	//editor
	const [editorLoaded, setEditorLoaded] = useState(false);
	useEffect(() => {
		setEditorLoaded(true);
	}, []);

	const library = useLibrary();

	const getcontract = async () => {
		return await getContract(library, address, "Project");
	};

	const handleUploadImage = (e) => {
		uploadImage(token, e.target.files[0])
			.then((res) => {
				setImage(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	//token

	useEffect(() => {
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
				Web3Token.verify(token);
				setToken(token);
				return;
			} catch (e) {
				console.log(e);
			}
		}
		newToken();
	}, []);

	//beneficy
	const [beneficy, setBeneficy] = useState([]);
	const [showDelete, setShowDelete] = useState(false);

	const columnsProject = [
		{
			name: "Địa chỉ ví",
			selector: (row) => row.address,
		},
		{
			name: "Họ và tên",
			selector: (row) => row.name,
		},
		{
			name: "Thông tin",
			selector: (row) => row.description,
		},
		{
			name: "",
			selector: (row) =>
				parseInt(info.state) == 0 ? (
					<div className={styles.actionTable}>
						<AiOutlineDelete onClick={() => setShowDelete(true)} />
						<Modal
							show={showDelete}
							onHide={() => setShowDelete(false)}
							header={"Xóa"}
							content={
								<div>
									<div className={styles.deleteGroup}>
										<div className={styles.content}>
											Bạn có chắc chắn muốn xóa?
										</div>
										<div className={styles.modalAction}>
											<Button onClick={() => handleDeleteBeneficy(row.address)}>
												Xóa
											</Button>
											<Button
												typeButton="action"
												onClick={() => setShowDelete(false)}
											>
												Hủy
											</Button>
										</div>
									</div>
								</div>
							}
						></Modal>
					</div>
				) : null,
			ignoreRowClick: true,
			allowOverflow: true,
			button: true,
		},
	];

	const handleDeleteBeneficy = (address) => {
		const newListBeneficy = beneficy.filter((item) => {
			return item.address !== address;
		});
		setBeneficy(newListBeneficy);
		setShowDelete(false);
	};

	useEffect(() => {
		const getData = async () => {
			const contract = await getcontract();

			let tempProject = await getProjectInfo(contract);
			console.log(tempProject);
			setName(tempProject.name);
			if (!_.isEmpty(tempProject.beneficiaries))
				setBeneficy(benficyToObj(tempProject.beneficiaries));
			setTarget(library.utils.fromWei(tempProject.target));
			let infoProject = await getProjectByAddress(tempProject.projectAddress);
			setDesc(infoProject.data.data.description);
			setImage(infoProject.data.data.image);
			setInfomation(infoProject.data.data.infomation);
			setProblem(infoProject.data.data.problem);

			setInfo(tempProject);
			let res = await getAllBeneficy();
			setListBeneficy(res.data.data);
		};
		getData().then((res) => {
			setLoading(false);
		});
	}, []);

	const handleStartProject = async () => {
		const contract = await getcontract();
		updateAndStartCharity(
			contract,
			account,
			name,
			library.utils.toWei(target),
			benficyToArray(beneficy)
		)
			.then((res) => {
				let newInfo = {
					address: info.projectAddress,
					description: desc,
					image: image,
					infomation: infomation,
					problem: problem,
				};
				createOrUpdate(token, newInfo).then((res) => {
					navigate("/auth/manager");
				});
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const handleSaveProject = () => {
		let newInfo = {
			address: info.projectAddress,
			description: desc,
			image: image,
			infomation: infomation,
			problem: problem,
		};
		console.log(newInfo);
		createOrUpdate(token, newInfo).then((res) => {
			navigate("/auth/manager");
		});
	};

	const benficyToObj = (beneficies) => {
		if (beneficies.length < 1) return [];
		return beneficies.map((item) => {
			return {
				address: item[0],
				name: item[1],
				description: item[2],
			};
		});
	};

	const benficyToArray = (beneficies) => {
		if (beneficies.length < 1) return [];
		return beneficies.map((item) => {
			return [item.address, item.name, item.description];
		});
	};

	const [searchBeneficy, setSearchBeneficy] = useState();
	const searchItem = (item, value) => {
		const keyword = value.toLowerCase();
		return (
			item.address.toLowerCase().includes(keyword) ||
			item.name.toLowerCase().includes(keyword)
		);
	};

	const handleSelect = (val) => {
		sugget.forEach((item) => {
			if (item.address === val) {
				let temp = [...beneficy];
				temp.push({
					address: item.address,
					name: item.name,
					description: item.description,
				});
				setBeneficy(temp);
			}
		});
	};

	useEffect(() => {
		let newListBeneficy = listBeneficy.filter((item) => {
			let status = true;
			beneficy.forEach((i) => {
				if (item.address === i.address) {
					status = false;
				}
			});
			return status;
		});
		setSugget(newListBeneficy);
	}, [beneficy, listBeneficy]);

	console.log(showDelete);

	return loading || _.isEmpty(token) ? (
		<Loading />
	) : (
		<div className={styles.wrapper}>
			<Container>
				<div className={styles.titleEdit}>
					<h3 className={styles.title}>Dự án từ thiện</h3>
					<div className={styles.titleMore}>
						<p>
							{info.name} - {info.projectAddress}
						</p>
					</div>
				</div>

				<Input
					label="Tên dự án"
					name="name"
					defaultValue={name}
					disabled={parseInt(info.state) !== 0}
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
				<div className={styles.amountGroup}>
					<Input
						label="Mục tiêu"
						name="target"
						type="number"
						defaultValue={target}
						disabled={parseInt(info.state) !== 0}
						onChange={(e) => {
							setTarget(e.target.value);
						}}
					/>
					<div className={styles.logoGroup}>
						<img src={EthIcon} /> <span> ETH</span>
					</div>
				</div>
				<div className={styles.imageUpload}>
					<p style={{ fontWeight: 600 }}>Hình ảnh</p>
					<div className={styles.imageReview}>
						{image && image !== "" && (
							<div className={styles.reviewWrapper}>
								<img src={image} />
								<AiOutlineClose
									style={{ cursor: "pointer" }}
									onClick={() => setImage("")}
								/>
							</div>
						)}
						<label htmlFor="uploadImageCustom">
							<AiFillCamera style={{ cursor: "pointer" }} />
						</label>
						<input
							id="uploadImageCustom"
							accept="image/*"
							type="file"
							name="image"
							onChange={handleUploadImage}
							hidden
						/>
					</div>
				</div>
				<TextArea
					label="Thông tin"
					defaultValue={desc}
					onChange
					name="description"
					onChange={(e) => setDesc(e.target.value)}
				/>
				<TextArea
					label="Vấn đề gặp phải"
					defaultValue={problem}
					name="problem"
					onChange={(e) => setProblem(e.target.value)}
				/>

				<div className={styles.editItem}>
					<div className={styles.actionAddBeneficy}>
						<div style={{ fontWeight: 600 }}>Người thụ hưởng</div>
						{parseInt(info.state) == 0 && (
							<>
								<Autocomplete
									getItemValue={(item) => item.address}
									items={sugget}
									shouldItemRender={(item, value) => searchItem(item, value)}
									renderItem={(item, isHighlighted) => (
										<div
											style={{
												background: isHighlighted ? "lightgray" : "white",
												zIndex: 1000,
												cursor: "pointer",
												margin: "10px 10px",
											}}
										>
											{item.address} - {item.name}
										</div>
									)}
									menuStyle={{
										zIndex: 1,
									}}
									value={searchBeneficy}
									onChange={(e) => setSearchBeneficy(e.target.value)}
									onSelect={(val) => handleSelect(val)}
								/>
							</>
						)}
					</div>
					<Table
						fixedHeaderScrollHeight={"100%"}
						columns={columnsProject}
						data={beneficy}
					></Table>
				</div>
				<div className={styles.editItem}>
					<div style={{ fontWeight: 600 }}>Thông tin thêm</div>
					<Editor
						name="infomation"
						onChange={(data) => {
							setInfomation(data);
						}}
						value={infomation}
					/>
				</div>
				<div className={styles.editProjectAction}>
					{parseInt(info.state) == 0 ? (
						<>
							<Button onClick={handleStartProject}>Bắt đầu dự án</Button>
							<Button className={styles.deleteButton}>Xóa</Button>
						</>
					) : (
						<Button onClick={handleSaveProject}>Lưu</Button>
					)}
				</div>
			</Container>
		</div>
	);
};

export default ProjectEdit;
