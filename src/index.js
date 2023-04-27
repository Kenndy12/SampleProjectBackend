const express = require("express");
const DBConnHandler = require("./database/connectionHandler");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./routes/users");
const templateRouter = require("./routes/templates");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const templateService = require("./service/templateService");
const userService = require("./service/userService");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/v1/api/users", userRouter(userService));
app.use("/v1/api/templates", templateRouter(templateService));
app.get("*", (_, res) => {
	res.status(404).json({ message: "You are at the wrong place" });
});

app.listen(process.env.port || 8000, () => {
	console.log(`Server has started on port ${process.env.port || 8000}`);
});
DBConnHandler.mongoDB.connect();
