import React from "react";
import DataTable from "react-data-table-component";
import Loading from "../Loading";
import styles from "./styles.module.scss";

const Table = ({ columns, data, ...etc }) => {
	return (
		<div className={styles.tableComponent}>
			<DataTable
				columns={columns}
				data={data}
				pagination
				progressComponent={<Loading />}
				persistTableHead={true}
				{...etc}
			/>
		</div>
	);
};

export default Table;
