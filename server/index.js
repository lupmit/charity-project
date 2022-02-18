const express = require("express");
const cors = require("cors");
const path = require("path");
const imageController = require("./controllers/imageController");
const projectController = require("./controllers/projectController");
const beneficyController = require("./controllers/beneficyController");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cors());

const buildPath = path.join(__dirname, "..", "build");
app.use(express.static(buildPath));

const mongoose = require("mongoose");
mongoose.connect(
	"mongodb+srv://lupmit:auCbPlc2urr4aAI8@cluster0.yereb.mongodb.net/charityProject?retryWrites=true&w=majority",
	{ useNewUrlParser: true },
	(err) => {
		if (!err) {
			console.log("MongoDB Connection Succeeded.");
		} else {
			console.log("Error in DB connection : " + err);
		}
	}
);

app.get("/api", (req, res) =>
	res.status(200).json({ error: null, data: "halo api!" })
);

//image
app.use("/api/upload", imageController);

//project
app.use("/api/project", projectController);

//beneficy
app.use("/api/beneficy", beneficyController);

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
