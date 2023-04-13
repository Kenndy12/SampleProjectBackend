const Users = require("../models/users");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const OTP_CODE = "1111";

module.exports = {
	login: async (req, res) => {
		try {
			const { email, password } = req.body;
			const user = await Users.findOne({ email: email });
			if (!user)
				return res.status(500).json({ message: "User does not exist" });

			if (password !== user.password) {
				return res.status(401).json({ message: "Wrong password!" });
			}
			return res.status(200).json({ message: "Logged in", user });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: error });
		}
	},

	checkOTP: async (req, res) => {
		try {
			const { email, OTP } = req.body;
			if (OTP !== OTP_CODE)
				return res.status(401).json({ message: "Incorrect OTP" });

			const token = jwt.sign({ email: email }, "secret_passphrase", {
				expiresIn: "1h",
			});
			return res.status(200).json({ token: token });
		} catch (error) {
			return res.status(500).json({ message: error });
		}
	},

	changeName: async (req, res) => {
		try {
			const email = res.user.email;
			const { name } = req.body;

			const updatedUser = await Users.findOneAndUpdate(
				{ email: email },
				{ name: name },
				{
					new: true,
				}
			);

			return res
				.status(200)
				.json({ message: "User succesfully updated", updatedUser });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: error });
		}
	},

	changeEmail: async (req, res) => {
		try {
			const email = res.user.email;
			const { updatedEmail } = req.body;

			const updatedUser = await Users.findOneAndUpdate(
				{ email: email },
				{ email: updatedEmail },
				{
					new: true,
				}
			);
			const token = jwt.sign({ email: updatedEmail }, "secret_passphrase", {
				expiresIn: "1h",
			});
			return res
				.status(200)
				.json({
					message: "User succesfully updated",
					newToken: token,
					updatedUser,
				});
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: error });
		}
	},

	changePassword: async (req, res) => {
		try {
			const email = res.user.email;
			const { password } = req.body;

			const updatedUser = await Users.findOneAndUpdate(
				{ email: email },
				{ password: password },
				{
					new: true,
				}
			);

			return res
				.status(200)
				.json({ message: "User succesfully updated", updatedUser });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: error });
		}
	},

	changePhone: async (req, res) => {
		try {
			const email = res.user.email;
			const { phone } = req.body;

			const updatedUser = await Users.findOneAndUpdate(
				{ email: email },
				{ phone: phone },
				{
					new: true,
				}
			);

			return res
				.status(200)
				.json({ message: "User succesfully updated", updatedUser });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: error });
		}
	},
};
