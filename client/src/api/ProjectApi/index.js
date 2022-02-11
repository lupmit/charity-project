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

const updateAndStartCharity = (contract, account, name, target, beneficies) => {
	return contract.methods
		.upadateAndStartCharity(name, target, beneficies)
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

const donate = (contract, account, name, message, value) => {
	return contract.methods
		.donate(name, message)
		.send(
			{ from: account, value: value, gas: 3000000 },
			function (err, transactionHash) {
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
			}
		);
};

const getAllDonator = (contract) => {
	return contract.methods.getAllDonator().call();
};

const getAllBeneficiary = (contract) => {
	return contract.methods.getAllBeneficiary().call();
};

const getAllTransactionBeneficiary = (contract) => {
	return contract.methods.getAllTransactionBeneficiary().call();
};

const getProjectInfo = (contract) => {
	return contract.methods.getProjectInfo().call();
};

const getMyDonation = (contract, address) => {
	return contract.methods.getMyDonator(address).call();
};

export {
	updateAndStartCharity,
	donate,
	getAllDonator,
	getAllBeneficiary,
	getProjectInfo,
	getAllTransactionBeneficiary,
	getMyDonation,
};
