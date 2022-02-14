import Charity from "../../contracts/Charity.json";
import Project from "../../contracts/Project.json";
import { NETWORK_ID } from "../../config";

export const getContract = (library, address, type) => {
	switch (type) {
		case "Project":
			return new library.eth.Contract(Project.abi, address);
		default:
			return new library.eth.Contract(Charity.abi, address);
	}
};

export const getCharityAdress = () => {
	return Charity.networks[NETWORK_ID].address;
};
