import React from "react";
import { Modal as ModalComponent } from "react-bootstrap";
import styles from "./styles.module.scss";

const Modal = ({ show, onHide, header, content, footer, ...etc }) => {
	return (
		<div className={styles.wrapper}>
			<ModalComponent centered show={show} onHide={onHide} {...etc}>
				<ModalComponent.Header className={styles.modalHeader} closeButton>
					{header}
				</ModalComponent.Header>
				<ModalComponent.Body>{content}</ModalComponent.Body>
				{footer ? (
					<ModalComponent.Footer className={styles.modalFooter}>
						{footer}
					</ModalComponent.Footer>
				) : null}
			</ModalComponent>
		</div>
	);
};

export default Modal;
