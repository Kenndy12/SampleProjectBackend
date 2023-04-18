const express = require("express");
const controller = require("../handlers/userController");
const verifyToken = require("../handlers/middleware/verifyToken");
const router = express.Router();

router.post("/login", controller.login);
router.post("/check", controller.checkOTP);
router.get("/profile", verifyToken, controller.getProfile);
router.patch("/name", verifyToken, controller.changeName);
router.patch("/email", verifyToken, controller.changeEmail);
router.patch("/password", verifyToken, controller.changePassword);
router.patch("/phone", verifyToken, controller.changePhone);
module.exports = router;
