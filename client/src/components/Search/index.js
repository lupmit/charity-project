import React from "react";
import classNames from "classnames";
import { DebounceInput } from "react-debounce-input";
import { FiSearch } from "react-icons/fi";
import styles from "./styles.module.scss";

const Search = (props) => {
	const { className, ...rest } = props;
	return (
		<div className={classNames(styles.search, className)}>
			<FiSearch />
			<DebounceInput debounceTimeout={300} {...rest} />
		</div>
	);
};

export default Search;
