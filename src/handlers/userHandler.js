require("dotenv").config();

module.exports = {
	login: (userService) => async (req, res) => {
		try {
			const login = await userService.login(req.body);
			if (login.message === "Logged in") {
				return res
					.status(200)
					.json({ message: login.message, user: login.user });
			} else {
				return res.status(500).json({ message: login.message });
			}
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: error });
		}
	},

	checkOTP: (userService) => async (req, res) => {
		try {
			const checkOTP = await userService.checkOTP(req.body);
			if (checkOTP.message === "Incorrect OTP")
				return res.status(500).json({ message: checkOTP.message });
			return res.status(200).json({ token: checkOTP.token });
		} catch (error) {
			return res.status(500).json({ message: error });
		}
	},

	getProfile: (userService) => async (_, res) => {
		try {
			const getProfile = await userService.getProfile(res.user.id);
			if (getProfile.message === "No user found")
				return res.status(500).json({ message: getProfile.message });

			return res.status(200).json({ userProfile: getProfile.userProfile });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: error });
		}
	},

	changeName: (userService) => async (req, res) => {
		try {
			const id = res.user.id;
			const { name } = req.body;
			const changeName = await userService.changeName({ id, name });
			return res.status(200).json({
				message: "User succesfully updated",
				updatedUser: changeName.updatedUser,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: error });
		}
	},

	changeEmail: (userService) => async (req, res) => {
		try {
			const id = res.user.id;
			const { email } = req.body;
			const changeEmail = await userService.changeEmail({ id, email });
			return res.status(200).json({
				message: "User succesfully updated",
				updatedUser: changeEmail.updatedUser,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: error });
		}
	},

	changePassword: (userService) => async (req, res) => {
		try {
			const id = res.user.id;
			const { password } = req.body;

			const changePassword = await userService.changePassword({ id, password });

			return res.status(200).json({
				message: "User succesfully updated",
				updatedUser: changePassword.updatedUser,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: error });
		}
	},

	changePhone: (userService) => async (req, res) => {
		try {
			const id = res.user.id;
			const { phone } = req.body;

			const changePhone = await userService.changePhone({ id, phone });

			return res.status(200).json({
				message: "User succesfully updated",
				updatedUser: changePhone.updatedUser,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: error });
		}
	},
};
