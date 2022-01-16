const express = require("express");
const multer = require("multer");
const path = require("path");

var router = express.Router();

// Set The Storage Engine
const storage = multer.diskStorage({
	destination: "./public/uploads/",
	filename: function (req, file, cb) {
		let filename = req.body?.name
			? req.body.name + ".jpg"
			: file.fieldname + "-" + Date.now() + ".jpg";
		cb(null, filename);
	},
});

// Init Upload
const upload = multer({
	storage: storage,
	limits: { fileSize: 1000000 },
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	},
}).single("upload");

// Check File Type
function checkFileType(file, cb) {
	const filetypes = /jpeg|jpg|png|gif/;
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = filetypes.test(file.mimetype);

	if (mimetype && extname) {
		return cb(null, true);
	} else {
		cb("Error: Images Only!");
	}
}

router.post("/", (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			res.status(400).json({
				error: err,
				data: null,
				uploaded: false,
			});
		} else {
			if (req.file == undefined) {
				res.render("index", {
					msg: "Error: No File Selected!",
				});
			} else {
				res.status(200).json({
					error: null,
					data: `uploads/${req.file.filename}`,
					uploaded: true,
					url: `uploads/${req.file.filename}`,
				});
			}
		}
	});
});

module.exports = router;
