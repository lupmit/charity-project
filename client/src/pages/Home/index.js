import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import Container from "../../components/Container";
import { ReactComponent as Icon } from "../../assets/images/icon.svg";
import {
	addCharityProject,
	addManager,
	getAllProject,
	getMyProject,
	getProjectInfo,
	getCharityInfo,
} from "../../api/CharityApi";
import { donate, startCharity, addBeneficiary } from "../../api/ProjectApi";
import { getContract, getCharityAdress } from "../../helpers/Contract";
import { useWeb3React } from "@web3-react/core";
import { useLibrary } from "../../helpers/Hook";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

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

	const library = useLibrary();
	const getInfoProject = (contract, address) => {
		return getProjectInfo(contract, address);
	};

	useEffect(() => {
		const getData = async () => {
			const promise = [];
			let data = [];
			const contract = await getContract(library, getCharityAdress());
			const allProject = await getAllProject(contract);
			if (allProject.length >= 1) {
				allProject.forEach((element) => {
					promise.push(getInfoProject(contract, element));
				});
				data = await Promise.all(promise);
			}
			setInfoProject(data);

			const info = await getCharityInfo(contract);

			setinfoCharity(info);
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
				return parseFloat(a[4]) < parseFloat(b[4])
					? 1
					: parseFloat(a[4]) === parseFloat(b[4])
					? parseFloat(a[3]) < parseFloat(b[3])
						? 1
						: -1
					: -1;
			});
			return cloneArray;
		}
		return [];
	};

	let hightlight = getProjectHighlight();
	console.log(hightlight);
	return loading ? (
		<Loading />
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
						<img src="https://resource.binance.charity/images/3e39d9ef77344ad29feda41184add5b5_covidfitured.jpg" />

						<div class={styles.projectInfo}>
							<div className={styles.feature}>Featured project</div>
							<h2 className={styles.projectName}>{hightlight[0].name}</h2>
							<div className={styles.projectDesc}>
								{hightlight[0].description}
							</div>
							{console.log(hightlight[0])}
							<Link
								to={`/project/${hightlight[0].projectAddress}`}
								class={styles.link}
							>
								<button data-bn-type="button" class={styles.button}>
									Learn more
								</button>
							</Link>
						</div>
					</div>
					<div className={styles.image}>
						<img src="https://resource.binance.charity/images/3e39d9ef77344ad29feda41184add5b5_covidfitured.jpg" />

						<div class={styles.projectInfo}>
							<div className={styles.feature}>Featured project</div>
							<h2 className={styles.projectName}>{hightlight[1].name}</h2>
							<div className={styles.projectDesc}>
								{hightlight[1].description}
							</div>
							<Link
								to={`/project/${hightlight[1].projectAddress}`}
								class={styles.link}
							>
								<button data-bn-type="button" class={styles.button}>
									Learn more
								</button>
							</Link>
						</div>
					</div>
				</Carousel>
			</div>

			<div className={styles.impact}>
				<Container>
					{console.log(library)}
					<h5 className={styles.title}>Our Impact</h5>
					<div className={styles.info}>
						<div className={styles.item}>
							<div className={styles.value}>
								{library.utils.fromWei(infoCharity[0])} ETH
							</div>
							<div className={styles.key}>Amount raised</div>
						</div>
						<div className={styles.item}>
							<div className={styles.value}>{infoCharity[1]}</div>
							<div className={styles.key}>Total donations</div>
						</div>
						<div className={styles.item}>
							<div className={styles.value}>{infoCharity[2]}</div>
							<div className={styles.key}>Total end Beneficiaries</div>
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
									<img src="https://resource.binance.charity/images/3e39d9ef77344ad29feda41184add5b5_covidfitured.jpg" />
									<div class={styles.infoProject}>
										<div class={styles.name}>{item.name}</div>
									</div>
								</div>
							);
						})}
					</Carousel>
				</div>
			</div>
			<div className={styles.values}>
				<Container>
					<h5 className={styles.title}>Our Impact</h5>
					<div className={styles.info}>
						<div className={styles.item}>
							<Icon />
							<div className={styles.value}>Changemakers</div>
							<div className={styles.key}>
								We transfer your donation directly to the end beneficiary -
								meaning 100% of your money goes to those who need it most. We
								accept crypto as well as Visa/MasterCard.
							</div>
						</div>
						<div className={styles.item}>
							<Icon />
							<div className={styles.value}>Changemakers</div>
							<div className={styles.key}>
								We transfer your donation directly to the end beneficiary -
								meaning 100% of your money goes to those who need it most. We
								accept crypto as well as Visa/MasterCard.
							</div>
						</div>
						<div className={styles.item}>
							<Icon />
							<div className={styles.value}>Changemakers</div>
							<div className={styles.key}>
								We transfer your donation directly to the end beneficiary -
								meaning 100% of your money goes to those who need it most. We
								accept crypto as well as Visa/MasterCard.
							</div>
						</div>
					</div>
				</Container>
			</div>
			<div className={styles.partners}>
				<Container>
					<h5 className={styles.title}>Partners</h5>
					<div className={styles.listItem}>
						<div className={styles.item}>
							<img src="https://resource.binance.charity/images/5e4e91f0928a4ad890285873896b9c25_屏幕快照 2019-01-25 上午8.55.20.png"></img>
						</div>
						<div className={styles.item}>
							<img src="https://resource.binance.charity/images/5e618cfd288f4359ace3953f95f03620_logo-sml.png"></img>
						</div>
						<div className={styles.item}>
							<img src="https://resource.binance.charity/images/5e4e91f0928a4ad890285873896b9c25_屏幕快照 2019-01-25 上午8.55.20.png"></img>
						</div>
						<div className={styles.item}>
							<img src="https://resource.binance.charity/images/5e618cfd288f4359ace3953f95f03620_logo-sml.png"></img>
						</div>
						<div className={styles.item}>
							<img src="https://resource.binance.charity/images/5e4e91f0928a4ad890285873896b9c25_屏幕快照 2019-01-25 上午8.55.20.png"></img>
						</div>
					</div>
				</Container>
			</div>
		</div>
	);
}

export default Home;
