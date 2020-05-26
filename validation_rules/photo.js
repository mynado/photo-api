/**
 * Photo Validation Rules
 */

const { body } = require('express-validator');
const models = require('../models');

const createRules = [
	body('title').trim().isLength({ min: 2 }).custom(async value => {
		const photo = await new models.Photo({
			title: value,
		}).fetch({
			require: false,
		});
		if (photo) {
			return Promise.reject('Title already exists.');
		}
		return Promise.resolve();
	}),
	body('url').trim().isLength({ min: 3 }).isURL(),
	body('comment').optional(),
	body('album_id').optional().trim(),
];

const updateRules = [
	body('title').optional().trim().isLength({ min: 2 }),
	body('url').optional().trim().isLength({ min: 2 }).isURL(),
	body('comment').optional().trim(),
	body('album_id').optional().trim(),
]

module.exports = {
	createRules,
	updateRules,
}
