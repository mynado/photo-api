/**
 * Authentication middleware
 */

const jwt = require('jsonwebtoken');
const { getTokenFromHeaders } = require('../auth_controller');

const validateJwtToken = (req, res, next) => {
	const token = getTokenFromHeaders(req);
	if (!token) {
		res.status(401).send({
			status: 'fail',
			message: 'No token found in request headers.',
		});
		return;
	}

	// validate token and extract payload
	let payload = null;

	try {
		payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
	} catch (error) {
		res.status(403).send({
			status: 'fail',
			message: 'Authentication failed.',
		});
		throw error;
	}

	req.user = payload;

	next();
}

module.exports = {
	validateJwtToken,
}
