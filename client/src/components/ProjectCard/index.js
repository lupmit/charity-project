import React from "react";
import { Card, ProgressBar } from "react-bootstrap";
import styles from "./styles.module.scss";

const ProjectCard = () => {
	return (
		<Card className={styles.projectCard}>
			<div className={styles.imageGroup}>
				<Card.Img
					src="https://resource.binance.charity/images/a5ded15f1fae4b47b55264374adc845a_WechatIMG701.jpeg"
					alt="Card image"
					className={styles.imageBg}
				/>
				<div className={styles.imageText}>
					<h3>Covid19 Protocol</h3>
					<span>Hello im phuc . im a student</span>
				</div>
			</div>
			<Card.Body style={{ padding: "10px" }}>
				<div className={styles.progressGroup}>
					<div className={styles.content}>
						<span className={styles.amount}> 1,000 ETH</span>
						<span className={styles.target}>Của mục tiêu 1,500 ETH</span>
					</div>
					<div className={styles.progress}>
						<ProgressBar animated now={45} />
					</div>
				</div>
				<div className={styles.information}>
					<div className={styles.itemInfo}>
						<div className={styles.value}>100</div>
						<div className={styles.label}>Donations</div>
					</div>
					<div className={styles.itemInfo}>
						<div className={styles.value}>200</div>
						<div className={styles.label}>End-Beneficiaries</div>
					</div>
					<button className={styles.btnDonate}>Donate</button>
				</div>
			</Card.Body>
		</Card>
	);
};

export default ProjectCard;
