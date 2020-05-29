/**
 * Auth Controller
 */

const bcrypt = require('bcrypt');
const { validationResult, matchedData } = require('express-validator');
const jwt = require('jsonwebtoken');
const { User } = require('../models')

/**
 * Register User
 * POST /register
 */
const register = async (req, res) => {
	const errors = validationResult(req);

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
			message: 'Exception thrown when hashing the password.'
		});
		throw error;
	}

	try {
		await User.forge(validData).save();
		res.status(201).send({
			status: 'success',
			message: 'User registred',
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when creating a new user.'
		});
		throw error;
	}
}

/**
 * Login to get access token
 * POST /login
 */
const login = async (req, res) => {
	const user = await User.login(req.body.email, req.body.password);

	// check if user has typed email and password
	if (!user) {
		res.status(401).send({
			status: 'Fail',
			message: 'Authentication required',
		});
		return;
	}

	// construct jwt payload
	const payload = {
		data: {
			id: user.get('id'),
			email: user.get('email'),
			first_name: user.get('first_name'),
			last_name: user.get('last_name'),
		}
	}

	// sign payload and get access-token
	const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: process.env.ACCESS_TOKEN_LIFETIME || '1h',
	});

	res.status(200).send({
		status: 'success',
		data: {
			accessToken,
		},
	});

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
	login,
	getTokenFromHeaders,
}
