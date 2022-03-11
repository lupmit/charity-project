import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { shortAddress } from "../../utils/address";
import { BiCopy } from "react-icons/bi";
import styles from "./styles.module.scss";

const AddressComponent = ({ address, ...etc }) => {
	const handleCopyClick = (address) => {
		navigator.clipboard.writeText(address);
	};

	const renderTooltip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
			copy address
		</Tooltip>
	);
	return (
		<div className={styles.addressWrapper} {...etc}>
			{shortAddress(address)}
			<OverlayTrigger
				placement="top"
				delay={{ show: 250, hide: 400 }}
				overlay={renderTooltip}
			>
				<span>
					<BiCopy onClick={() => handleCopyClick(address)} />
				</span>
			</OverlayTrigger>
		</div>
	);
};

export default AddressComponent;
