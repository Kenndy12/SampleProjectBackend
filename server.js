const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./routes/users");
const templateRouter = require("./routes/templates");
const createServer = () => {
	const app = express();

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cors());
	app.use("/v1/api/users", userRouter);
	app.use("/v1/api/templates", templateRouter);
	app.get("*", (_, res) => {
		res.status(404).json({ message: "You are at the wrong place" });
	});
	return app;
};

module.exports = createServer;
