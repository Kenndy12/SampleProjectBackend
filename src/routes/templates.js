const express = require("express");
const controller = require("../handlers/templateHandler");
const verifyToken = require("../handlers/middleware/verifyToken");
const router = express.Router();

module.exports = (templateService) => {
	router.get("/", controller.list(templateService));
	router.get(
		"/getByUser",
		verifyToken,
		controller.getTemplatesByUser(templateService)
	);
	router.post("/create", verifyToken, controller.create(templateService));
	router.patch("/:id", controller.edit(templateService));
	router.post("/send/:id", controller.sendEmail(templateService));

	return router;
};
