/**
 * Photo Controller
 */

 const { validationResult, matchedData } = require('express-validator');
 const models = require('../models');

 /**
  * Get all resources
  * GET /
  */
const index = async (req, res) => {
	const allPhotos = await models.Photo.fetchAll();

	res.status(200).send({
		status: 'success',
		data: {
			photo: allPhotos,
		}
	});
}

/**
 * Get a specific resource
 * GET /:photoId
 */
const show = async (req, res) => {
	const photo = await new models.Photo({ id: req.params.photoId }).fetch({ withRelated: 'album' });

	res.status(200).send({
		status: 'success',
		data: {
			photo,
		}
	})
}

/**
 * Store a new resource
 * POST /
 */
const store = async (req, res) => {
	// find the validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(422).send({
			status: 'fail',
			data: errors.array(),
		});
		return;
	}

	// extract valid data
	const validData = matchedData(req);

	// insert valid data into database
	try {
		const photo = await models.Photo.forge(validData).save();
		res.status(200).send({
			status: 'success',
			data: photo,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in the database when creating a new photo.'
		});
		throw error;
	}

}


/**
 * Update a specific resource
 * PUT /:photoId
 */
const update = (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method not allowed.',
	})
}

/**
 * Destroy a specific resource
 * DELETE /:photoId
 */
const destroy = (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method not allowed.',
	})
}

module.exports = {
	index,
	show,
	store,
	update,
	destroy,
}
