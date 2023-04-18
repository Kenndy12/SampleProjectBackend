const Users = require("../database/models/users");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const OTP_CODE = "11111";

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
			const { id, OTP } = req.body;
			if (OTP !== OTP_CODE)
				return res.status(401).json({ message: "Incorrect OTP" });

			const token = jwt.sign({ id: id }, "secret_passphrase", {
				expiresIn: "1h",
			});
			return res.status(200).json({ token: token });
		} catch (error) {
			return res.status(500).json({ message: error });
		}
	},

	getProfile: async (_, res) => {
		try {
			const id = res.user.id;
			const user = await Users.findOne({ _id: id });
			const userProfile = {
				_id: user.id,
				name: user.name,
				email: user.email,
				phone: user.phone,
			};
			return res.status(200).json({ userProfile });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: error });
		}
	},

	changeName: async (req, res) => {
		try {
			const id = res.user.id;
			console.log(id);
			const { name } = req.body;

			const updatedUser = await Users.findOneAndUpdate(
				{ _id: id },
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
			const id = res.user.id;
			const { updatedEmail } = req.body;

			const updatedUser = await Users.findOneAndUpdate(
				{ _id: id },
				{ email: updatedEmail },
				{
					new: true,
				}
			);

			return res.status(200).json({
				message: "User succesfully updated",
				updatedUser,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: error });
		}
	},

	changePassword: async (req, res) => {
		try {
			const id = res.user.id;
			const { password } = req.body;

			const updatedUser = await Users.findOneAndUpdate(
				{ _id: id },
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
			const id = res.user.id;
			const { phone } = req.body;

			const updatedUser = await Users.findOneAndUpdate(
				{ _id: id },
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
