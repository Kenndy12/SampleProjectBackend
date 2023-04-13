const express = require("express");
const controller = require("../controller/templateController");
const router = express.Router();

router.get("/", controller.list);
router.get("/:id", controller.get);
router.post("/create", controller.create);
router.patch("/:id", controller.edit);
router.post("/send/:id", controller.sendEmail);
module.exports = router;
