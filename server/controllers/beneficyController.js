const express = require("express");
var router = express.Router();
const BeneficyModel = require("../models/beneficyModel");
const authMiddleware = require("../middlewares/middleware");

router.get("/", (req, res) => {
	BeneficyModel.find((err, docs) => {
		if (!err) {
			res.status(200).json({
				error: null,
				data: docs,
			});
		} else {
			res.status(400).json({
				error: err,
				data: null,
			});
		}
	});
});

router.post("/", [authMiddleware], (req, res) => {
	BeneficyModel.findOne({ address: req.body.address }, (err, doc) => {
		if (!err && !doc) {
			insertRecord(req, res);
		} else {
			updateRecord(req, res);
		}
	});
});

function insertRecord(req, res) {
	var project = new BeneficyModel();
	project.address = req.body.address;
	project.name = req.body.name;
	project.description = req.body.description;
	project.save((err, doc) => {
		if (!err)
			res.status(200).json({
				error: null,
				data: doc,
			});
		else {
			res.status(400).json({
				error: err,
				data: null,
			});
		}
	});
}

function updateRecord(req, res) {
	BeneficyModel.findOneAndUpdate(
		{ address: req.body.address },
		req.body,
		{ new: true },
		(err, doc) => {
			if (!err) {
				res.status(200).json({
					error: null,
					data: doc,
				});
			} else {
				res.status(400).json({
					error: err,
					data: null,
				});
			}
		}
	);
}

router.get("/delete/:address", [authMiddleware], (req, res) => {
	BeneficyModel.findOneAndRemove({ address: req.params.address }, (err) => {
		if (!err) {
			res.status(200).json({
				error: null,
				data: "delete done!",
			});
		} else {
			console.log("Delete error :" + err);
		}
	});
});

module.exports = router;
