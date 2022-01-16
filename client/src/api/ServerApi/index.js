import axios from "axios";

const URL = "http://localhost:5000";

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

const deleteProjectByAddress = (address) => {
	return axios({
		method: "get",
		url: `${URL}/project/delete/${address}`,
	});
};

const createOrUpdate = (project) => {
	return axios({
		method: "post",
		url: `${URL}/project/`,
		data: project,
	});
};

const uploadImage = (file) => {
	let formData = new FormData();
	formData.append("upload", file);
	return axios.post(`${URL}/upload`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
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
