const allowedGetTemplatesByUser = Joi.object()
	.keys({
		name: Joi.string().required(),
		description: Joi.string().required(),
		subject: Joi.string().required(),
		user: Joi.string().required(),
		type: Joi.string().valid("Email", "Sms", "Push").required(),
		value: Joi.when("type", {
			is: "Email",
			then: Joi.string().custom(htmlCustom).required(),
		})
			.when("type", {
				is: "Sms",
				then: Joi.string().required(),
			})
			.when("type", {
				is: "Push",
				then: Joi.object().required(),
			}),
		rawValue: Joi.when("type", {
			is: "Email",
			then: Joi.object().required(),
			otherwise: Joi.object().forbidden(),
		}),
	})
	.required();

module.exports = {
	allowedGetTemplatesByUser,
};
