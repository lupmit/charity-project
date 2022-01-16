const updateAndStartCharity = (contract, account, name, target, beneficies) => {
	return contract.methods
		.upadateAndStartCharity(name, target, beneficies)
		.send({ from: account, gas: 3000000 });
};

const donate = (contract, account, name, message, value) => {
	return contract.methods
		.donate(name, message)
		.send({ from: account, value: value, gas: 3000000 });
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

export {
	updateAndStartCharity,
	donate,
	getAllDonator,
	getAllBeneficiary,
	getProjectInfo,
	getAllTransactionBeneficiary,
};
