const express = require("express");
const controller = require("../handlers/userHandler");
const verifyToken = require("../handlers/middleware/verifyToken");
const router = express.Router();

module.exports = (userService) => {
	router.post("/login", controller.login(userService));
	router.post("/check", controller.checkOTP(userService));
	router.get("/profile", verifyToken, controller.getProfile(userService));
	router.patch("/name", verifyToken, controller.changeName(userService));
	router.patch("/email", verifyToken, controller.changeEmail(userService));
	router.patch(
		"/password",
		verifyToken,
		controller.changePassword(userService)
	);
	router.patch("/phone", verifyToken, controller.changePhone(userService));

	return router;
};
