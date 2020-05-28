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
	body('photo_id').trim().isLength({ min: 1 }),
	//body('album_id').trim().isLength({ min: 1 }),
];

module.exports = {
	createRules,
	addPhotosRules,
}
