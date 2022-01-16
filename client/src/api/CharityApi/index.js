const addCharityProject = (contract, account, name, target) => {
	return contract.methods
		.addCharityProject(name, target)
		.send({ from: account, gas: 3000000 })
		.on("confirmation", (reciept) => {
			console.log(reciept);
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

export { addCharityProject, getAllProject, getProjectInfo, getCharityInfo };
