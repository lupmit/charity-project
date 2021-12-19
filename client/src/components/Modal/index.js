import React from "react";
import { Modal as ModalComponent } from "react-bootstrap";

const Modal = ({ show, onHide, header, content, footer, ...etc }) => {
	return (
		<div>
			<ModalComponent centered show={show} onHide={onHide} {...etc}>
				<ModalComponent.Header closeButton>{header}</ModalComponent.Header>
				<ModalComponent.Body>{content}</ModalComponent.Body>
				<ModalComponent.Footer>{footer}</ModalComponent.Footer>
			</ModalComponent>
		</div>
	);
};

export default Modal;
