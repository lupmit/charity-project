import { toast } from "react-toastify";
import Web3 from "web3";

var web3 = new Web3("http://172.20.10.3:7545");

const transactionReceiptAsync = async function (txnHash, resolve, reject) {
	try {
		var receipt = await web3.eth.getTransactionReceipt(txnHash);
		console.log(receipt);
		if (receipt === null) {
			setTimeout(function () {
				transactionReceiptAsync(txnHash, resolve, reject);
			}, 500);
		} else resolve(receipt);
	} catch (e) {
		reject(e);
	}
};

const addCharityProject = (contract, account, name, target) => {
	return contract.methods
		.addCharityProject(name, target)
		.send({ from: account, gas: 3000000 }, function (err, transactionHash) {
			if (!err)
				toast.promise(
					new Promise(function (resolve, reject) {
						transactionReceiptAsync(transactionHash, resolve, reject);
					}),
					{
						pending: "Promise is pending",
						success: "Promise resolved 👌",
						error: "Promise rejected 🤯",
					}
				);
		});
};

const getAllProject = (contract) => {
	return contract.methods.getAllProject().call();
};

const getProjectInfo = (contract, address) => {
	return contract.methods.getProjectInfo(address).call();
};

const getCharityInfo = (contract) => {
	return contract.methods.getInfoCharity().call();
};

const deleteCharityProject = (contract, account, address) => {
	return contract.methods
		.deleteCharityProject(address)
		.send({ from: account, gas: 3000000 }, function (err, transactionHash) {
			if (!err)
				toast.promise(
					new Promise(function (resolve, reject) {
						transactionReceiptAsync(transactionHash, resolve, reject);
					}),
					{
						pending: "Promise is pending",
						success: "Promise resolved 👌",
						error: "Promise rejected 🤯",
					}
				);
		});
};

const getOwner = (contract) => {
	return contract.methods.getOwner().call();
};

export {
	addCharityProject,
	getAllProject,
	getProjectInfo,
	getCharityInfo,
	deleteCharityProject,
	getOwner,
};
