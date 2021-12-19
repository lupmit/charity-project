import React, { useEffect, useState } from "react";
import { Card, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getContract } from "../../helpers/Contract";
import { useWeb3React } from "@web3-react/core";
import { getProjectInfo } from "../../api/CharityApi";
import { CHARITY_CONTRACT_ADDRESS } from "../../config";
import styles from "./styles.module.scss";

const ProjectCard = (props) => {
	const { data } = props;
	const { library } = useWeb3React();

	const navigate = useNavigate();
	const handleClickCard = () => {
		navigate("/project/" + data.projectAddress);
	};
	return (
		<div>
			{data && (
				<Card className={styles.projectCard}>
					<div className={styles.imageGroup} onClick={handleClickCard}>
						<Card.Img
							src="https://resource.binance.charity/images/a5ded15f1fae4b47b55264374adc845a_WechatIMG701.jpeg"
							alt="Card image"
							className={styles.imageBg}
						/>
						<div className={styles.imageText}>
							<h3>{data.name}</h3>
							<span>{data.description}</span>
						</div>
					</div>
					<Card.Body style={{ padding: "10px" }}>
						<div className={styles.progressGroup}>
							<div className={styles.content}>
								<span className={styles.amount}>
									{library.utils.fromWei(data.balance)} ETH
								</span>
								<span className={styles.target}>
									/ {library.utils.fromWei(data.target)} ETH
								</span>
							</div>
							<div className={styles.progress}>
								<ProgressBar
									animated
									now={(data.balance / data.target) * 100}
								/>
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.itemInfo}>
								<div className={styles.value}>{data.numberOfDonator}</div>
								<div className={styles.label}>Donations</div>
							</div>
							<div className={styles.itemInfo}>
								<div className={styles.value}>{data.numberOfBeneficy}</div>
								<div className={styles.label}>End-Beneficiaries</div>
							</div>
							<button onClick={handleClickCard} className={styles.btnDonate}>
								Donate
							</button>
						</div>
					</Card.Body>
				</Card>
			)}
		</div>
	);
};

export default ProjectCard;
