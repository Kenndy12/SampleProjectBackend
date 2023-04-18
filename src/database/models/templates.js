const mongoose = require("mongoose");

const templateSchema = mongoose.Schema({
	name: String,
	body: Object,
	cssFile: String,
	belongsTo: String,
});

module.exports = mongoose.model("templates", templateSchema);
