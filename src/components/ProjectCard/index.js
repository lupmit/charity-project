import React, { useEffect, useState } from "react";
import { Card, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { roundNumber } from "../../utils/number";
import { useLibrary } from "../../helpers/Hook";

const ProjectCard = (props) => {
	const { data } = props;
	const library = useLibrary();

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
							src={data.image}
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
									{roundNumber(
										parseFloat(library.utils.fromWei(data.balance)) +
											parseFloat(library.utils.fromWei(data.allocated))
									)}{" "}
									ETH
								</span>
								<span className={styles.target}>
									/ {roundNumber(library.utils.fromWei(data.target))} ETH
								</span>
							</div>
							<div className={styles.progress}>
								<ProgressBar
									animated
									now={
										((parseFloat(library.utils.fromWei(data.balance)) +
											parseFloat(library.utils.fromWei(data.allocated))) /
											parseFloat(library.utils.fromWei(data.target))) *
										100
									}
								/>
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.itemInfo}>
								<div className={styles.value}>{data.numberOfDonator}</div>
								<div className={styles.label}>Người đóng góp</div>
							</div>
							<div className={styles.itemInfo}>
								<div className={styles.value}>{data.numberOfBeneficy}</div>
								<div className={styles.label}>Người thụ hưởng</div>
							</div>
							<button
								onClick={handleClickCard}
								className={
									data.state === "1" ? styles.btnDonate : styles.btnView
								}
							>
								{data.state === "1" ? "Quyên góp" : "Xem thông tin"}
							</button>
						</div>
					</Card.Body>
				</Card>
			)}
		</div>
	);
};

export default ProjectCard;
