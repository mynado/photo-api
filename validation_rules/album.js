/**
 * Album Validation Rules
 */

const { body } = require('express-validator');
const models = require('../models');

const createRules = [
	body('title').trim().isLength({ min: 2 }).custom(async (value, {req}) => {
		const album = await new models.Album({
			title: value,
			user_id: req.user.data.id,
		}).fetch({
			require: false,
		});
		if (album) {
			return Promise.reject('Title already exists.');
		}
		return Promise.resolve();
	}),
];

const addPhotosRules = [
	body('photos_ids').isArray().custom(async (values) => {
		// validate that every element is a number
		if (!values.every(Number.isInteger)) {
			return Promise.reject('Invalid value in array.')
		}

	// validate that every value exists in database
		for (let i = 0; i < values.length; i++) {
			const photo = await models.Photo.fetchById(values[i]);

			if (!photo) {
				return Promise.reject(`Category ${values[i]} does not exist.`)
			}
		}
	}),
];

const updateRules = [
	body('title').trim().isLength({ min: 2 }).custom(async (value, {req}) => {
		const album = await new models.Album({
			title: value,
			user_id: req.user.data.id,
		}).fetch({
			require: false,
		});
		if (album) {
			return Promise.reject('Title already exists.');
		}
		return Promise.resolve();
	}),
];

module.exports = {
	createRules,
	addPhotosRules,
	updateRules,
}
