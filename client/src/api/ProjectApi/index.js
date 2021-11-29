const startCharity = (contract, account) => {
	return contract.methods.startCharity().send({ from: account, gas: 3000000 });
};

const addBeneficiary = (contract, account, beneficiaries) => {
	return contract.methods
		.addBeneficiary(beneficiaries)
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

export {
	startCharity,
	addBeneficiary,
	donate,
	getAllDonator,
	getAllBeneficiary,
	getAllTransactionBeneficiary,
};
