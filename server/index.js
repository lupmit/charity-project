const express = require("express");
var cors = require("cors");
const imageController = require("./controllers/imageController");
const projectController = require("./controllers/projectController");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cors());

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

app.get("/", (req, res) => res.status(200).json({ error: null, data: "halo" }));

//image
app.use("/upload", imageController);

//project
app.use("/project", projectController);

const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
