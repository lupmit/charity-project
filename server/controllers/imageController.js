const express = require("express");
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const authMiddleware = require("../middlewares/middleware");

var router = express.Router();

cloudinary.config({
	cloud_name: "db62zt51p",
	api_key: "895199457838725",
	api_secret: "38_KLD9bmHpCRiby5sG7xj_yY8g",
});
// Set The Storage Engine
const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "uploads/",
		format: async (req, file) => "jpg", // supports promises as well
		public_id: (req, file) =>
			req.body?.name
				? req.body.name + ".jpg"
				: file.fieldname + "-" + Date.now(),
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

router.post("/", [authMiddleware], (req, res) => {
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
					data: req.file.path,
					uploaded: true,
					url: req.file.path,
				});
			}
		}
	});
});

module.exports = router;
