import axios from "axios";

// JA4PWT5UBNPHV5T64AJETJ2E9W24ZAPXNN
const URL =
	"https://api-kovan.etherscan.io/api?apikey=JKXR76EA1NK9XSKES1T2BNYBZ41T3BJ2JH";

const getBalace = (address) => {
	return axios({
		method: "get",
		url: `${URL}&module=account&action=balance&address=${address}&tag=latest`,
	});
};

const getInternal = (address) => {
	return axios({
		method: "get",
		url: `${URL}&module=account&action=txlistinternal&address=${address}&startblock=0&endblock=99999999&sort=asc`,
	});
};

const getNormal = (address) => {
	return axios({
		method: "get",
		url: `${URL}&module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc`,
	});
};

export { getBalace, getNormal, getInternal };
