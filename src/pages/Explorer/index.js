import React, { useState } from "react";
import Button from "../../components/Button";
import Search from "../../components/Search";
import { AiOutlineSearch } from "react-icons/ai";
import * as _ from "lodash";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

const Explorer = () => {
	const [address, setAddress] = useState();
	const navigate = useNavigate();

	const handleClickExplorer = () => {
		navigate("/explorer/" + address);
	};
	return (
		<div className={styles.wrapper}>
			<div className={styles.headerDetail}>
				<img
					src={`https://bscscan.com/images/svg/components/abstract-shapes-20.svg?v=2`}
				/>
				<div className={styles.contentWrapper}>
					<div className={styles.content}>
						<h1 className={styles.title}>Charity Project Explorer</h1>
						<div className={styles.searhWrapper}>
							<Search
								placeholder="Tìm kiếm theo địa chỉ ví/ địa chỉ dự án"
								hideIcon={true}
								className={styles.searchInput}
								onChange={(event) => setAddress(event.target.value)}
							/>
							<div className={styles.buttonSearch}>
								<Button
									onClick={handleClickExplorer}
									disabled={_.isEmpty(address)}
								>
									<AiOutlineSearch />
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Explorer;
