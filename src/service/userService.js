const User = require("../database/models/users");
const jwt = require("jsonwebtoken");
const OTP_CODE = "11111";

module.exports = {
	login: async (payload) => {
		try {
			const { email, password } = payload;
			const user = await User.findOne({ email: email });
			if (!user) return { message: "User does not exist" };

			if (password !== user.password) {
				return { message: "Wrong password!" };
			}
			return { message: "Logged in", user };
		} catch (error) {
			throw new Error(error.message);
		}
	},

	checkOTP: async (payload) => {
		try {
			const { id, OTP } = payload;
			if (OTP !== OTP_CODE) return { message: "Incorrect OTP" };

			const token = jwt.sign({ id: id }, "secret_passphrase", {
				expiresIn: "1h",
			});
			return { token: token };
		} catch (error) {
			throw new Error(error.message);
		}
	},

	getProfile: async (payload) => {
		try {
			const id = payload;
			const user = await User.findOne({ _id: id });
			if (!user) {
				return { message: "No user found" };
			}
			const userProfile = {
				_id: user.id,
				name: user.name,
				email: user.email,
				phone: user.phone,
			};
			return { userProfile };
		} catch (error) {
			throw new Error(error.message);
		}
	},

	changeName: async (payload) => {
		try {
			const { id, name } = payload;
			const updatedUser = await User.findOneAndUpdate(
				{ _id: id },
				{ name: name },
				{
					new: true,
				}
			);
			return { updatedUser };
		} catch (error) {
			throw new Error(error.message);
		}
	},

	changeEmail: async (payload) => {
		try {
			const { id, email } = payload;
			const updatedUser = await User.findOneAndUpdate(
				{ _id: id },
				{ email: email },
				{
					new: true,
				}
			);
			return { updatedUser };
		} catch (error) {
			throw new Error(error.message);
		}
	},

	changePassword: async (payload) => {
		try {
			const { id, password } = payload;
			const updatedUser = await User.findOneAndUpdate(
				{ _id: id },
				{ password: password },
				{
					new: true,
				}
			);
			return { updatedUser };
		} catch (error) {
			throw new Error(error.message);
		}
	},

	changePhone: async (payload) => {
		try {
			const { id, phone } = payload;
			const updatedUser = await User.findOneAndUpdate(
				{ _id: id },
				{ phone: phone },
				{
					new: true,
				}
			);
			return { updatedUser };
		} catch (error) {
			throw new Error(error.message);
		}
	},
};
