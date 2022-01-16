const express = require("express");
var router = express.Router();
const ProjectModel = require("../models/projectModel");

router.get("/", (req, res) => {
	ProjectModel.find((err, docs) => {
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

router.get("/:address", (req, res) => {
	ProjectModel.findOne({ address: req.params.address }, (err, doc) => {
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
	});
});

router.post("/", (req, res) => {
	ProjectModel.findOne({ address: req.body.address }, (err, doc) => {
		if (!err && !doc) {
			insertRecord(req, res);
		} else {
			updateRecord(req, res);
		}
	});
});

function insertRecord(req, res) {
	var project = new ProjectModel();
	project.address = req.body.address;
	project.image = req.body.image;
	project.description = req.body.description;
	project.problem = req.body.problem;
	project.infomation = req.body.infomation;
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
	ProjectModel.findOneAndUpdate(
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

router.get("/delete/:address", (req, res) => {
	ProjectModel.findOneAndRemove({ address: req.params.address }, (err) => {
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
