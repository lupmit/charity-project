import axios from "axios";

const URL = "http://172.20.10.3:5000";

const getAllProject = () => {
	return axios({
		method: "get",
		url: `${URL}/project`,
	});
};

const getProjectByAddress = (address) => {
	return axios({
		method: "get",
		url: `${URL}/project/${address}`,
	});
};

const deleteProjectByAddress = async (token, address) => {
	return axios({
		method: "get",
		url: `${URL}/project/delete/${address}`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

const createOrUpdate = async (token, project) => {
	return axios({
		method: "post",
		url: `${URL}/project/`,
		data: project,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

const uploadImage = async (token, file) => {
	let formData = new FormData();
	formData.append("upload", file);
	return axios.post(`${URL}/upload`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${token}`,
		},
	});
};

export {
	getAllProject,
	getProjectByAddress,
	deleteProjectByAddress,
	createOrUpdate,
	uploadImage,
};
