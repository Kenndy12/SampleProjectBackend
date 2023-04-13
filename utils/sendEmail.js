const nodemailer = require("nodemailer");
require("dotenv").config();
const sendEmail = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			service: process.env.SERVICE,
			port: 587,
			secure: true,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: subject,
			text: text,
		});

		console.log("email sent sucessfully");
	} catch (error) {
		console.log(error, "email not sent");
	}
};

module.exports = sendEmail;
