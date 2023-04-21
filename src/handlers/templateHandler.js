require("dotenv").config();

module.exports = {
	list: (templateService) => async (_, res) => {
		try {
			const templates = await templateService.list();
			return res
				.status(200)
				.json({ message: "Succesfully retrieved templats", templates });
		} catch (error) {
			return res.status(500).json({ message: error });
		}
	},

	getTemplatesByUser: (templateService) => async (_, res) => {
		try {
			const id = res.user.id;
			const templates = await templateService.getTemplatesByUser(id);
			return res
				.status(200)
				.json({ message: "Succesfully retrieved templates", templates });
		} catch (error) {
			return res.status(500).json({ message: error });
		}
	},

	create: (templateService) => async (req, res) => {
		try {
			const id = res.user.id;
			const data = await templateService.createTemplate({
				id,
				...req.body,
			});
			return res
				.status(200)
				.json({ message: "Succesfully created template", data });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: error });
		}
	},

	edit: (templateService) => async (req, res) => {
		try {
			const { id } = req.params;
			const data = await templateService.updateTemplate({
				id,
				...req.body,
			});
			return res
				.status(200)
				.json({ message: "Succesfully updated Template", data });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: error });
		}
	},

	sendEmail: (templateService) => async (req, res) => {
		try {
			const sentStatus = await templateService.sendEmail({ ...req.body });
			return res
				.status(200)
				.json({ message: `Successfully sent email`, sentStatus });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: error });
		}
	},
};
