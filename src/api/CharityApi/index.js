import { toast } from "react-toastify";
import Web3 from "web3";
import { BASE_PROVIDER_URL } from "../../config";

var web3 = new Web3(BASE_PROVIDER_URL);

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
		.send({ from: account, gas: 3500000 }, function (err, transactionHash) {
			if (!err)
				toast.promise(
					new Promise(function (resolve, reject) {
						transactionReceiptAsync(transactionHash, resolve, reject);
					}),
					{
						pending: "Transaction pending",
						success: "Transaction confirm",
						error: "Transaction rejected",
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
		.send({ from: account, gas: 3500000 }, function (err, transactionHash) {
			if (!err)
				toast.promise(
					new Promise(function (resolve, reject) {
						transactionReceiptAsync(transactionHash, resolve, reject);
					}),
					{
						pending: "Transaction pending",
						success: "Transaction confirm",
						error: "Transaction rejected",
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
