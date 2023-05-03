const { ModelValidationError } = require("./errors");
const { allowedGetTemplatesByUser } = require("./schema/templateSchema");

const getTemplatesByUser = async (req, res, next) => {
	const { error } = allowedGetTemplatesByUser;

	if (error) {
		return ModelValidationError(error);
	}
	next();
};

module.exports = {
	getTemplatesByUser,
};
