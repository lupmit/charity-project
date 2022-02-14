import React from "react";
import Container from "../../components/Container";
import Pic1 from "../../assets/images/pic1.svg";
import Pic2 from "../../assets/images/pic2.svg";
import Pic3 from "../../assets/images/pic3.svg";
import Pic4 from "../../assets/images/pic4.svg";
import styles from "./styles.module.scss";

const About = () => {
	return (
		<div className={styles.wrapper}>
			<Container>
				<div className={styles.contentWrapper}>
					<div className={styles.contentText}>
						<h1 className={styles.title}>About Us</h1>
						<div className={styles.text}>
							Our aim is to create last-mile solutions for impactful social
							projects and scaling them up quickly to fundamentally change
							millions of lives. People with non-smart phones can now own crypto
							wallets to receive and transfer crypto currencies that serve as
							alternative assets to protect their property value.
						</div>
					</div>
					<div className={styles.imageWrapper}>
						<img src={Pic4} className={styles.image} />
					</div>
				</div>
				<div className={styles.contentWrapper}>
					<div className={styles.imageWrapper}>
						<img src={Pic1} className={styles.image} />
					</div>
					<div className={styles.contentText}>
						<h1 className={styles.title}>Our Mission</h1>
						<div className={styles.text}>
							With our partners and donors, we aim to not only create thoughtful
							solutions and long-term change for some of the world's most
							complex problems, but also a brand new experience for donating. We
							also want to give everyone the ability to see how their
							contributions via blockchain technology are making visible changes
							in the world. We envision a world where blockchain technology can
							be used for philanthropy as a social contract to end all forms of
							poverty and inequality, and advance sustainable development to
							ensure no one is left behind.
						</div>
					</div>
				</div>
				<div className={styles.contentWrapper}>
					<div className={styles.contentText}>
						<h1 className={styles.title}>2022 Initiative</h1>
						<div className={styles.text}>
							Binance Charity wants to spearhead new innovative solutions
							towards impactful social projects and efficiently scaling them up
							to fundamentally change millions of lives. We want to give people
							without smartphones the ability to receive and transfer crypto
							currencies as an alternative form of safeguarding their assets. We
							are also looking at empowering more NGOs and volunteers by giving
							them an efficient and engaging volunteer management solution with
							Binance's blockchain infrastructure.
						</div>
					</div>
					<div className={styles.imageWrapper}>
						<img src={Pic2} className={styles.image} />
					</div>
				</div>
				<div className={styles.contentWrapper}>
					<div className={styles.imageWrapper}>
						<img src={Pic3} className={styles.image} />
					</div>
					<div className={styles.contentText}>
						<h1 className={styles.title}>Our Approach</h1>
						<div className={styles.text}>
							Transparent Donation System We create a blockchain-based donation
							system that makes each transaction flow transparent, accountable,
							and efficient. Developing & Testing Innovative Solutions We work
							onsite to understand local needs and develop solutions for
							specific social problems. We continually test and improve on our
							solutions to scale up the social impact.
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default About;
