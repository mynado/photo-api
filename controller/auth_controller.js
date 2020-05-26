/**
 * Auth Controller
 */

const bcrypt = require('bcrypt');
const { validationResult, matchedData } = require('express-validator');
const { User } = require('../models')

/**
 * Register User
 * POST /register
 */
const register = async (req, res) => {
	const errors = validationResult(req);
	console.log(validationResult(req))
	if (!errors.isEmpty()) {
		res.status(422).send({
			status: 'fail',
			data: errors.array(),
		});
		return;
	}

	const validData = matchedData(req);

	try {
		validData.password = await bcrypt.hash(validData.password, User.hashSaltRounds);
	} catch (error) {
		res.status(500).send({
			status: 'error',
			data: 'Exception thrown when hashing the password.'
		});
		throw error;
	}

	try {
		const user = await User.forge(validData).save();
		res.status(201).send({
			status: 'success',
			data: 'User registred',
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			data: 'Exception thrown when creating a new user.'
		});
		throw error;
	}
}

/**
 * Get token from HTTP headers
 */
const getTokenFromHeaders = (req) => {
	// check if authorization header exists
	if (!req.headers.authorization) {
		return false;
	}

	// Split authorization header
	const [authType, token] = req.headers.authorization.split(' ');

	// Check that authorization type is Bearer
	if (authType.toLowerCase() !== "bearer") {
		return false;
	}

	return token;
}

module.exports = {
	register,
	getTokenFromHeaders,
}
