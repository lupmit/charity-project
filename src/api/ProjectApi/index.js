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
			}, 1000);
		} else resolve(receipt);
	} catch (e) {
		reject(e);
	}
};

const updateAndStartCharity = (contract, account, name, target, beneficies) => {
	return contract.methods
		.upadateAndStartCharity(name, target, beneficies)
		.send({ from: account, gas: 3500000 }, function (err, transactionHash) {
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
			{ from: account, value: value, gas: 3500000 },
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
