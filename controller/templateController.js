const Templates = require("../models/templates");
const nodemailer = require("nodemailer");
const sendEmail = require("../utils/sendEmail");
require("dotenv").config();

module.exports = {
	list: async (_, res) => {
		try {
			const templates = await Templates.find();
			return res
				.status(200)
				.json({ message: "Succesfully retrieved templats", templates });
		} catch (error) {
			return res.status(500).json({ message: error });
		}
	},

	get: async (req, res) => {
		try {
			const { id } = req.params;
			const template = await Templates.findById(id);

			return res
				.status(200)
				.json({ message: `Succesfully retrieved document ${id}`, template });
		} catch (error) {
			return res.status(500).json({ message: error });
		}
	},

	create: async (req, res) => {
		try {
			const { name, header, body, cssFile } = req.body;
			const createTemplate = await Templates.create({
				name,
				header,
				body,
				cssFile,
			});
			return res
				.status(200)
				.json({ message: "Succesfully created template", createTemplate });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: error });
		}
	},

	edit: async (req, res) => {
		try {
			const { id } = req.params;
			const template = await Templates.findById(id);
			const updateBody = {
				name: req.body.name || template.name,
				header: req.body.header || template.header,
				body: req.body.body || template.body,
				cssFile: req.body.cssFile || template.cssFile,
			};

			const updateTemplate = await Templates.findByIdAndUpdate(id, updateBody, {
				new: true,
			});
			return res.status(200).json({
				message: `Succesfully updated document ${id}`,
				updateTemplate,
			});
		} catch (error) {
			return res.status(500).json({ message: error });
		}
	},

	sendEmail: async (req, res) => {
		try {
			const { id } = req.params;
			const template = await Templates.findById(id);
			await sendEmail("justkenndy92@gmail.com", "hello", template);
			return res.status(200).jspon({ message: `Succesfully sent email` });
		} catch (error) {
			return res.status(500).json({ message: error });
		}
	},
};
