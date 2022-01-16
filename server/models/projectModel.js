const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
	address: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: false,
	},
	description: {
		type: String,
		required: false,
	},
	problem: {
		type: String,
		required: false,
	},
	infomation: {
		type: String,
		require: false,
	},
});

const ProjectModel = mongoose.model("Project", ProjectSchema);

module.exports = ProjectModel;
