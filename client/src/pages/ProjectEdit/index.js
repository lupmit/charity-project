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
import { getProjectByAddress } from "../../api/ServerApi";
import { updateAndStartCharity } from "../../api/ProjectApi";
import { useWeb3React } from "@web3-react/core";
import styles from "./styles.module.scss";

const ProjectEdit = () => {
	const [info, setInfo] = useState();
	const [loading, setLoading] = useState(true);
	const params = useParams();
	const address = params.address;

	const { account, error } = useWeb3React();

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
		uploadImage(e.target.files[0])
			.then((res) => {
				setImage(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	//beneficy
	const [beneficy, setBeneficy] = useState([]);
	const [openAddBeneficy, setOpenAddBeneficy] = useState(false);
	const [editOrDelete, setEditOrDelete] = useState(0);

	const columnsProject = [
		{
			name: "Address",
			selector: (row) => row.address,
		},
		{
			name: "Name",
			selector: (row) => row.name,
		},
		{
			name: "Description",
			selector: (row) => row.description,
		},
		{
			name: "Action",
			selector: (row) =>
				parseInt(info.state) == 0 ? (
					<div className={styles.actionTable}>
						<AiOutlineEdit onClick={() => setEditOrDelete(1)} />
						<AiOutlineDelete onClick={() => setEditOrDelete(2)} />
						<Modal
							show={editOrDelete}
							onHide={() => setEditOrDelete(0)}
							header={editOrDelete === 1 && "Edit Beneficy"}
							content={
								<div>
									{editOrDelete === 1 ? (
										<form onSubmit={hanldeSubmitAddBeneficy}>
											<Input
												label="Wallet address"
												name="address"
												defaultValue={row.address}
												required
											/>
											<Input
												label="Name"
												name="name"
												defaultValue={row.name}
												required
											/>
											<Input
												label="Description"
												name="description"
												defaultValue={row.description}
												required
											/>
											<input value={row.address} name="old-address" hidden />
											<div className={styles.modalAction}>
												<Button type="submit">Save</Button>
												<Button
													typeButton="outline"
													onClick={() => setEditOrDelete(0)}
												>
													Cancel
												</Button>
											</div>
										</form>
									) : (
										<div>
											<div>Are you sure?</div>
											<div className={styles.modalAction}>
												<Button
													onClick={() => handleDeleteBeneficy(row.address)}
												>
													Save
												</Button>
												<Button
													typeButton="outline"
													onClick={() => setEditOrDelete(0)}
												>
													Cancel
												</Button>
											</div>
										</div>
									)}
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

	const hanldeSubmitAddBeneficy = (e) => {
		e.preventDefault();
		let newListBeneficy = [...beneficy];
		if (e.target[3]) {
			newListBeneficy = newListBeneficy.filter((item) => {
				return item.address !== e.target[3].value;
			});
		}
		newListBeneficy.push({
			address: e.target[0].value,
			name: e.target[1].value,
			description: e.target[2].value,
		});
		setBeneficy(newListBeneficy);
		setOpenAddBeneficy(false);
		if (e.target[3]) {
			setEditOrDelete(0);
		}
	};

	const handleDeleteBeneficy = (address) => {
		const newListBeneficy = beneficy.filter((item) => {
			return item.address !== address;
		});
		setBeneficy(newListBeneficy);
	};

	useEffect(() => {
		const getData = async () => {
			const contract = await getcontract();

			let tempProject = await getProjectInfo(contract);
			console.log(tempProject);
			setName(tempProject.name);
			setBeneficy(benficyToObj(tempProject.beneficiaries));
			setTarget(library.utils.fromWei(tempProject.target));
			let infoProject = await getProjectByAddress(tempProject.projectAddress);
			setDesc(infoProject.data.data.description);
			setImage(infoProject.data.data.image);
			setInfomation(infoProject.data.data.infomation);
			setProblem(infoProject.data.data.problem);

			setInfo(tempProject);
			setLoading(false);
		};
		getData();
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
				createOrUpdate(newInfo);
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
		createOrUpdate(newInfo);
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

	return loading ? (
		<Loading />
	) : (
		<div className={styles.wrapper}>
			<Container>
				<div className={styles.titleEdit}>
					<h3>Project Edit</h3>
					<p>{info.name}</p>
					<p>{info.projectAddress}</p>
				</div>

				<Input
					label="Project name"
					name="name"
					defaultValue={name}
					disabled={parseInt(info.state) !== 0}
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
				<Input
					label="Target"
					name="target"
					type="number"
					defaultValue={target}
					disabled={parseInt(info.state) !== 0}
					onChange={(e) => {
						setTarget(e.target.value);
					}}
				/>
				<div className={styles.imageUpload}>
					<p>Project image</p>
					<div className={styles.imageReview}>
						{image && image !== "" && (
							<div className={styles.reviewWrapper}>
								<img src={`http://localhost:5000/${image}`} />
								<AiOutlineClose onClick={() => setImage("")} />
							</div>
						)}
						<label htmlFor="uploadImageCustom">
							<AiFillCamera />
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
				<Input
					label="Description"
					defaultValue={desc}
					onChange
					name="description"
					onChange={(e) => setDesc(e.target.value)}
				/>
				<Input
					label="What is problem"
					defaultValue={problem}
					name="problem"
					onChange={(e) => setProblem(e.target.value)}
				/>

				<div className={styles.editItem}>
					<div className={styles.actionAddBeneficy}>
						<div>Beneficies</div>
						{parseInt(info.state) == 0 && (
							<p onClick={() => setOpenAddBeneficy(true)}>+ Add</p>
						)}
						<Modal
							show={openAddBeneficy}
							onHide={() => setOpenAddBeneficy(false)}
							header={"Add Beneficy"}
							content={
								<div>
									<form onSubmit={hanldeSubmitAddBeneficy}>
										<Input label="Wallet address" name="address" required />
										<Input label="Name" name="name" required />
										<Input label="Description" name="description" required />
										<div className={styles.modalAction}>
											<Button type="submit">Save</Button>
											<Button
												typeButton="outline"
												onClick={() => setOpenAddBeneficy(false)}
											>
												Cancel
											</Button>
										</div>
									</form>
								</div>
							}
						></Modal>
					</div>
					<Table
						fixedHeader={true}
						fixedHeaderScrollHeight={"100%"}
						columns={columnsProject}
						data={beneficy}
					></Table>
				</div>
				<div className={styles.editItem}>
					<div>More infomation</div>
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
							<Button onClick={handleStartProject}>Start Project</Button>
							<Button>Delete Project</Button>
						</>
					) : (
						<Button onClick={handleSaveProject}>Save</Button>
					)}
				</div>
			</Container>
		</div>
	);
};

export default ProjectEdit;
