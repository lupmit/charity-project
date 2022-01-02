import React from "react";
import Carousel from "react-multi-carousel";
import Container from "../../components/Container";
import { ReactComponent as Icon } from "../../assets/images/icon.svg";
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
		items: 3,
		paritialVisibilityGutter: 60,
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 3,
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
	return (
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
							<h2 className={styles.projectName}>Crypto Against COVID</h2>
							<div className={styles.projectDesc}>
								Join Binance Charity and help the world fight COVID-19.
							</div>
							<a href="/crypto-against-covid" class={styles.link}>
								<button data-bn-type="button" class={styles.button}>
									Learn more
								</button>
							</a>
						</div>
					</div>
					<div className={styles.image}>
						<img src="https://resource.binance.charity/images/3e39d9ef77344ad29feda41184add5b5_covidfitured.jpg" />

						<div class={styles.projectInfo}>
							<div className={styles.feature}>Featured project</div>
							<h2 className={styles.projectName}>Crypto Against COVID</h2>
							<div className={styles.projectDesc}>
								Join Binance Charity and help the world fight COVID-19.
							</div>
							<a href="/crypto-against-covid" class={styles.link}>
								<button data-bn-type="button" class={styles.button}>
									Learn more
								</button>
							</a>
						</div>
					</div>
					<div className={styles.image}>
						<img src="https://resource.binance.charity/images/3e39d9ef77344ad29feda41184add5b5_covidfitured.jpg" />

						<div class={styles.projectInfo}>
							<div className={styles.feature}>Featured project</div>
							<h2 className={styles.projectName}>Crypto Against COVID</h2>
							<div className={styles.projectDesc}>
								Join Binance Charity and help the world fight COVID-19.
							</div>
							<a href="/crypto-against-covid" class={styles.link}>
								<button data-bn-type="button" class={styles.button}>
									Learn more
								</button>
							</a>
						</div>
					</div>
				</Carousel>
			</div>

			<div className={styles.impact}>
				<Container>
					<h5 className={styles.title}>Our Impact</h5>
					<div className={styles.info}>
						<div className={styles.item}>
							<div className={styles.value}>1,965</div>
							<div className={styles.key}>Amount raised</div>
						</div>
						<div className={styles.item}>
							<div className={styles.value}>1,965</div>
							<div className={styles.key}>Amount raised</div>
						</div>
						<div className={styles.item}>
							<div className={styles.value}>1,965</div>
							<div className={styles.key}>Amount raised</div>
						</div>
					</div>
				</Container>
				<div className={styles.carouselInfo}>
					<Carousel
						responsive={responsive1}
						partialVisbile={true}
						itemClass={styles.imageItem}
					>
						<div className={styles.image}>
							<img src="https://resource.binance.charity/images/3e39d9ef77344ad29feda41184add5b5_covidfitured.jpg" />
							<div class={styles.infoProject}>
								<div class={styles.name}>
									Emergency appeal: Haiti Earthquake Relief
								</div>
							</div>
						</div>
						<div className={styles.image}>
							<img src="https://resource.binance.charity/images/3e39d9ef77344ad29feda41184add5b5_covidfitured.jpg" />

							<div class={styles.infoProject}>
								<div class={styles.name}>
									Emergency appeal: Haiti Earthquake Relief
								</div>
							</div>
						</div>
						<div className={styles.image}>
							<img src="https://resource.binance.charity/images/3e39d9ef77344ad29feda41184add5b5_covidfitured.jpg" />
							<div class={styles.infoProject}>
								<div class={styles.name}>
									Emergency appeal: Haiti Earthquake Relief
								</div>
							</div>
						</div>
						<div className={styles.image}>
							<img src="https://resource.binance.charity/images/3e39d9ef77344ad29feda41184add5b5_covidfitured.jpg" />
							<div class={styles.infoProject}>
								<div class={styles.name}>
									Emergency appeal: Haiti Earthquake Relief
								</div>
							</div>
						</div>
						<div className={styles.image}>
							<img src="https://resource.binance.charity/images/3e39d9ef77344ad29feda41184add5b5_covidfitured.jpg" />
							<div class={styles.infoProject}>
								<div class={styles.name}>
									Emergency appeal: Haiti Earthquake Relief
								</div>
							</div>
						</div>
						<div className={styles.image}>
							<img src="https://resource.binance.charity/images/3e39d9ef77344ad29feda41184add5b5_covidfitured.jpg" />
							<div class={styles.infoProject}>
								<div class={styles.name}>
									Emergency appeal: Haiti Earthquake Relief
								</div>
							</div>
						</div>
						<div className={styles.image}>
							<img src="https://resource.binance.charity/images/3e39d9ef77344ad29feda41184add5b5_covidfitured.jpg" />
							<div class={styles.infoProject}>
								<div class={styles.name}>
									Emergency appeal: Haiti Earthquake Relief
								</div>
							</div>
						</div>
						<div className={styles.image}>
							<img src="https://resource.binance.charity/images/3e39d9ef77344ad29feda41184add5b5_covidfitured.jpg" />
							<div class={styles.infoProject}>
								<div class={styles.name}>
									Emergency appeal: Haiti Earthquake Relief
								</div>
							</div>
						</div>
						<div className={styles.image}>
							<img src="https://resource.binance.charity/images/3e39d9ef77344ad29feda41184add5b5_covidfitured.jpg" />
							<div class={styles.infoProject}>
								<div class={styles.name}>
									Emergency appeal: Haiti Earthquake Relief
								</div>
							</div>
						</div>
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
