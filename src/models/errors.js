class ModelValidationError extends Error {
	constructor(validationError) {
		super();
		this.validationError = validationError;
	}
}

module.exports = {
	ModelValidationError,
};
