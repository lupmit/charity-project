import React, { useEffect, useState } from "react";
import * as _ from "lodash";
import Carousel from "react-multi-carousel";
import Container from "../../components/Container";
import { ReactComponent as Icon1 } from "../../assets/images/icon1.svg";
import { ReactComponent as Icon2 } from "../../assets/images/icon2.svg";
import { ReactComponent as Icon3 } from "../../assets/images/icon3.svg";
import {
	addCharityProject,
	addManager,
	getAllProject,
	getMyProject,
	getProjectInfo,
	getCharityInfo,
} from "../../api/CharityApi";
import { getAllBeneficy } from "../../api/ServerApi";
import { donate, startCharity, addBeneficiary } from "../../api/ProjectApi";
import { getContract, getCharityAdress } from "../../helpers/Contract";
import { useWeb3React } from "@web3-react/core";
import { useLibrary } from "../../helpers/Hook";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getProjectByAddress } from "../../api/ServerApi";
import { roundNumber } from "../../utils/number";
import styles from "./styles.module.scss";
import Partner1 from "../../assets/images/partner1.png";
import Partner2 from "../../assets/images/partner2.png";
import Partner3 from "../../assets/images/partner3.png";
import Partner4 from "../../assets/images/partner4.png";
import Partner5 from "../../assets/images/partner5.png";

const responsive = {
	superLargeDesktop: {
		// the naming can be any, depends on you.
		breakpoint: { max: 4000, min: 3000 },
		items: 1,
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 1,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 1,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
	},
};

const responsive1 = {
	superLargeDesktop: {
		// the naming can be any, depends on you.
		breakpoint: { max: 4000, min: 3000 },
		items: 6,
		paritialVisibilityGutter: 60,
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 4,
		paritialVisibilityGutter: 60,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2,
		paritialVisibilityGutter: 60,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
		paritialVisibilityGutter: 60,
	},
};

function Home(props) {
	const [infoProject, setInfoProject] = useState();
	const [infoCharity, setinfoCharity] = useState();
	const [loading, setLoading] = useState(true);
	const [beneficy, setBeneficy] = useState([]);

	const library = useLibrary();
	const getInfoProject = (contract, address) => {
		return getProjectInfo(contract, address);
	};

	const ProjectInfoToObj = (projects) => {
		if (projects.length < 1) return [];
		return projects.map((item) => {
			return {
				projectAddress: item[0],
				name: item[1],
				target: item[2],
				balance: item[3],
				allocated: item[4],
				numberOfDonator: item[5],
				numberOfBeneficy: item[6],
				beneficiaries: item[7],
				state: item[8],
			};
		});
	};

	useEffect(() => {
		const getData = async () => {
			const promise1 = [];
			const promise2 = [];
			let data1 = [];
			let data2 = [];
			const contract = await getContract(library, getCharityAdress());
			const allProject = await getAllProject(contract);
			if (allProject.length >= 1) {
				allProject.forEach((element) => {
					promise1.push(getInfoProject(contract, element));
					promise2.push(getProjectByAddress(element));
				});
				data1 = await Promise.all(promise1);
				data1 = ProjectInfoToObj(data1);
				data2 = await Promise.all(promise2);
				data2 = data2.map((item) => item.data.data);
				if (!_.isEmpty(data1) && !_.isEmpty(data2)) {
					const data = _.map(data1, function (item) {
						return _.extend(
							item,
							_.find(data2, { address: item.projectAddress })
						);
					});
					console.log(data);
					setInfoProject(data);
				}
			}

			const info = await getCharityInfo(contract);

			setinfoCharity(info);

			const beneficyFromServer = await getAllBeneficy();

			let listBeneficy = [];
			if (!beneficyFromServer.data.error) {
				listBeneficy = [...beneficyFromServer.data.data];
			}

			setBeneficy(listBeneficy);
		};
		getData().then((res) => {
			setLoading(false);
		});
	}, []);

	const navigate = useNavigate();
	const handleClickCard = (item) => {
		navigate("/project/" + item.projectAddress);
	};

	const getProjectHighlight = () => {
		if (infoProject) {
			const cloneArray = infoProject?.filter((item) => {
				return item.state > 0;
			});
			cloneArray.sort((a, b) => {
				return parseFloat(a.target) < parseFloat(b.target) ? 1 : -1;
			});
			return cloneArray;
		}
		return [];
	};

	let hightlight = getProjectHighlight();
	return loading || _.isEmpty(hightlight) ? (
		<Loading style={{ height: "100vh" }} />
	) : (
		<div className={styles.wrapper}>
			<div className={styles.carousel}>
				<Carousel
					responsive={responsive}
					infinite={true}
					// autoPlay={true}
					showDots={true}
				>
					<div className={styles.image}>
						<img src={hightlight[0].image} />

						<div className={styles.projectInfo}>
							<div className={styles.projectInfoWrapper}>
								<div className={styles.feature}>D??? ??n n???i b???t</div>
								<h2 className={styles.projectName}>{hightlight[0].name}</h2>
								<div className={styles.projectDesc}>
									{hightlight[0].description}
								</div>
								<Link
									to={`/project/${hightlight[0].projectAddress}`}
									className={styles.link}
								>
									<button data-bn-type="button" className={styles.button}>
										T??m hi???u th??m
									</button>
								</Link>
							</div>
						</div>
					</div>
					{hightlight.length > 2 ? (
						<div className={styles.image}>
							<img src={hightlight[1].image} />

							<div className={styles.projectInfo}>
								<div className={styles.projectInfoWrapper}>
									<div className={styles.feature}>D??? ??n n???i b???t</div>
									<h2 className={styles.projectName}>{hightlight[1].name}</h2>
									<div className={styles.projectDesc}>
										{hightlight[1].description}
									</div>
									<Link
										to={`/project/${hightlight[1].projectAddress}`}
										className={styles.link}
									>
										<button data-bn-type="button" className={styles.button}>
											T??m hi???u th??m
										</button>
									</Link>
								</div>
							</div>
						</div>
					) : null}
				</Carousel>
			</div>

			<div className={styles.impact}>
				<Container>
					<h5 className={styles.title}>T??c ?????ng c???a ch??ng t??i</h5>
					<div className={styles.info}>
						<div className={styles.item}>
							<div className={styles.value}>
								{roundNumber(library.utils.fromWei(infoCharity[0]))} ETH
							</div>
							<div className={styles.key}>S??? ti???n huy ?????ng ???????c</div>
						</div>
						<div className={styles.item}>
							<div className={styles.value}>{infoCharity[1]}</div>
							<div className={styles.key}>S??? ng?????i ???? ????ng g??p</div>
						</div>
						<div className={styles.item}>
							<div className={styles.value}>{beneficy.length}</div>
							<div className={styles.key}>S??? ng?????i th??? h?????ng</div>
						</div>
					</div>
				</Container>
				<div className={styles.carouselInfo}>
					<Carousel responsive={responsive1} itemClass={styles.imageItem}>
						{hightlight?.map((item) => {
							return (
								<div
									className={styles.image}
									onClick={() => handleClickCard(item)}
								>
									<img src={item.image} />
									<div className={styles.infoProject}>
										<div className={styles.name}>{item.name}</div>
									</div>
								</div>
							);
						})}
					</Carousel>
				</div>
			</div>
			<div className={styles.values}>
				<Container>
					<h5 className={styles.title}>Gi?? tr??? mang l???i</h5>
					<div className={styles.info}>
						<div className={styles.item}>
							<Icon1 height={100} />
							<div className={styles.value}>T??c ?????ng tr???c ti???p</div>
							<div className={styles.key}>
								Ch??ng t??i chuy???n kho???n ????ng g??p c???a b???n tr???c ti???p ?????n ng?????i th???
								h?????ng cu???i c??ng - ngh??a l?? 100% s??? ti???n c???a b???n s??? ???????c chuy???n
								?????n nh???ng ng?????i c???n n?? nh???t
							</div>
						</div>
						<div className={styles.item}>
							<Icon2 height={100} />
							<div className={styles.value}>Thay ?????i</div>
							<div className={styles.key}>
								H?????ng t???i m???t th??? gi???i b??nh ?????ng, ph??t tri???n b???n v???ng. Gi??p ?????,
								n??ng cao ?????i s???ng c???a h??ng tri???u nh???ng ho??n c???nh kh?? kh??n
							</div>
						</div>
						<div className={styles.item}>
							<Icon3 height={100} />
							<div className={styles.value}>Minh b???ch</div>
							<div className={styles.key}>
								Th??ng qua s???c m???nh c???a c??ng ngh??? blockchain, ch??ng t??i ??ang
								chuy???n ?????i c??ch th???c ho???t ?????ng t??? thi???n, b???ng c??ch cung c???p m???t
								quy tr??nh t??? ?????ng v?? ho??n to??n minh b???ch.
							</div>
						</div>
					</div>
				</Container>
			</div>
			<div className={styles.partners}>
				<Container>
					<h5 className={styles.title}>?????i t??c</h5>
					<div className={styles.listItem}>
						<div className={styles.item}>
							<img src={Partner1}></img>
						</div>
						<div className={styles.item}>
							<img src={Partner2}></img>
						</div>
						<div className={styles.item}>
							<img src={Partner3}></img>
						</div>
						<div className={styles.item}>
							<img src={Partner4}></img>
						</div>
						<div className={styles.item}>
							<img src={Partner5}></img>
						</div>
					</div>
				</Container>
			</div>
		</div>
	);
}

export default Home;
