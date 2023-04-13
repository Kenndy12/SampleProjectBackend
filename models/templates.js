const mongoose = require("mongoose");

const templateSchema = mongoose.Schema({
	name: String,
	header: String,
	body: String,
	cssFile: String,
});

module.exports = mongoose.model("templates", templateSchema);
