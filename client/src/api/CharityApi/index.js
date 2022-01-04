const addManager = (contract, account, address, name, description) => {
	return contract.methods
		.addManager(address, name, description)
		.send({ from: account, gas: 3000000 });
};

const deleteManager = (contract, account, address) => {
	return contract.methods
		.deleteManager(address)
		.send({ from: account, gas: 3000000 });
};

const updateManager = (contract, account, address, name, description) => {
	return contract.methods
		.updateManager(address, name, description)
		.send({ from: account, gas: 3000000 });
};

const addCharityProject = (contract, account, name, description, target) => {
	return contract.methods
		.addCharityProject(name, description, target)
		.send({ from: account, gas: 3000000 });
};

const getAllProject = (contract) => {
	return contract.methods.getAllProject().call();
};

const getProjectInfo = (contract, address) => {
	return contract.methods.getProjectInfo(address).call();
};

const getAllManager = (contract) => {
	return contract.methods.getAllManager().call();
};

const getMyProject = (contract, address) => {
	return contract.methods.getMyProject(address).call();
};

const getCharityInfo = (contract) => {
	return contract.methods.getInfoCharity().call();
};

export {
	addManager,
	deleteManager,
	updateManager,
	addCharityProject,
	getAllProject,
	getAllManager,
	getMyProject,
	getProjectInfo,
	getCharityInfo,
};
