const mongoose = require("mongoose");
require("dotenv").config();

const openMongoConnection = async () => {
	mongoose
		.connect(process.env.connection_url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.catch((e) => {
			console.info(`Failed to establish MongoDB Connection, ${e}`);
		});
};

mongoose.connection.on("connected", () => console.log("DB Connected"));
mongoose.connection.on("reconnected", () => console.log("DB Reconnected"));

module.exports = {
	mongoDB: {
		connect: openMongoConnection,
		disconnect: mongoose.disconnect,
	},
};
