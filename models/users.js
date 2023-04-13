const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	name: String,
	email: String,
	password: String,
	phone: String,
});

module.exports = mongoose.model("users", userSchema);
