import React from "react";
import Button from "../../components/Button";
import Search from "../../components/Search";
import { AiOutlineSearch } from "react-icons/ai";
import styles from "./styles.module.scss";

const Explorer = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.headerDetail}>
				<img
					src={`https://bscscan.com/images/svg/components/abstract-shapes-20.svg?v=2`}
				/>
				<div class={styles.contentWrapper}>
					<div class={styles.content}>
						<h1 className={styles.title}>Charity Project Explorer</h1>
						<div className={styles.searhWrapper}>
							<Search
								placeholder="Search by Address/ Txn Hash"
								hideIcon={true}
								className={styles.searchInput}
								onChange={(event) => console.log(event.target.value)}
							/>
							<div className={styles.buttonSearch}>
								<Button>
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
