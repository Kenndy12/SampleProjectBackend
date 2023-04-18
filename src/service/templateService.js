const Templates = require("../database/models/templates");

module.exports = {
	list: async () => {
		try {
			const data = await Templates.find();
			return { message: "Succesfully list all templates", data };
		} catch (error) {
			throw new Error(error.message);
		}
	},

	getTemplatesByUser: async (id) => {
		try {
			const templates = await Templates.find({ belongsTo: id });
			return {
				message: `Succesfully returned templates belonging to ${id}`,
				templates,
			};
		} catch (error) {
			throw new Error(error.message);
		}
	},

	createTemplate: async (payload) => {
		try {
			const { id, name, body, cssFile } = payload;
			const template = await Templates.create({
				name,
				body,
				cssFile,
				belongsTo: id,
			});
			return { message: "Successfully Saved Template", template };
		} catch (error) {
			throw new Error(error.message);
		}
	},

	updateTemplate: async (payload) => {
		try {
			const { id } = payload;
			const { name, body } = payload;
			const template = await Templates.findByIdAndUpdate(
				id,
				{ name, body },
				{ new: true }
			);
			return { message: "Succesfully updated template", template };
		} catch (error) {
			throw new Error(error.message);
		}
	},
};
