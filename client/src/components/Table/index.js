import React from "react";
import DataTable from "react-data-table-component";
import styles from "./styles.module.scss";

const paginationComponentOptions = {
	noRowsPerPage: true,
};

const Table = ({ columns, data }) => {
	return (
		<div className={styles.tableComponent}>
			<DataTable
				columns={columns}
				data={data}
				pagination
				paginationComponentOptions={paginationComponentOptions}
			/>
		</div>
	);
};

export default Table;
