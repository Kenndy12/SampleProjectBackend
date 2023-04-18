const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: "No token found" });
	}
	let token = req.headers.authorization.split(" ")[1];
	if (!token) {
		return res.status(403).json({
			message: "No Token found!",
		});
	}

	try {
		const jwtPayload = jwt.verify(token, "secret_passphrase");
		if (!jwtPayload) {
			return res.status(403).json({
				message: "No user found!",
			});
		}
		res.user = {
			id: jwtPayload.id,
		};
		next();
	} catch (error) {
		return res.status(500).json({
			message: error,
		});
	}
};

module.exports = verifyToken;
