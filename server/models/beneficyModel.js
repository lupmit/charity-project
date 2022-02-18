const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BeneficySchema = new Schema({
	address: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: false,
	},
	description: {
		type: String,
		required: false,
	},
});

const BeneficyModel = mongoose.model("Beneficy", BeneficySchema);

module.exports = BeneficyModel;
