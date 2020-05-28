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
	let photos = null;

	try {
		photos = await models.Photo.where("user_id", req.user.data.id).fetchAll();
	} catch (error) {
		res.sendStatus(404);
		return;
	}

	res.status(200).send({
		status: 'success',
		data: {
			photos,
		}
	});
}

/**
 * Get a specific resource
 * GET /:photoId
 */
const show = async (req, res) => {

	let photo = null;

	try {
		photo = await new models.Photo({id: req.params.photoId, user_id: req.user.data.id}).fetch();
	} catch (error) {
		res.sendStatus(404);
		return;
	}

	res.status(200).send({
		status: 'success',
		data: {
			photo,
		}
	});
}

/**
 * Store a new resource
 * POST /
 */
const store = async (req, res) => {
	const userId = req.user.data.id;
	console.log(req)
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
	let validData = matchedData(req);
	validData = {
		...validData,
		user_id: String(userId),
	}

	// insert valid data into database
	try {
		const photo = await models.Photo.forge(validData).save();
		res.status(201).send({
			status: 'success',
			data: {
				photo,
			}

		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			data: 'Exception thrown in the database when creating a new photo.'
		});
		throw error;
	}

}

/**
 * Update a specific resource
 * PUT /:photoId
 */
const update = async (req, res) => {

	// get photo
	const photo = await new models.Photo({ id: req.params.photoId, user_id: req.user.data.id }).fetch({ require: false });

	// check if photo exists
	if (!photo) {
		res.status(404).send({
			status: 'fail',
			data: 'Photo not found',
		});
		return;
	}

	// find the validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// fail
		res.status(422).send({
			status: 'fail',
			data: errors.array(),
		});
		return;
	}

	// extract valid data
	const validData = matchedData(req);
	try {
		// update valid data into specific user
		const updatedPhoto = await photo.save(validData);

		res.status(200).send({
			status: 'success',
			data: {
				photo: updatedPhoto,
			},
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			data: 'Exception thrown in database when updating a specific photo.'
		})
	}
}

/**
 * Destroy a specific resource
 * DELETE /:photoId
 */
const destroy = async (req, res) => {
	// get photo
	const photo = await new models.Photo({ id: req.params.photoId, user_id: req.user.data.id }).fetch({ withRelated: 'albums' });

	// check if photo exists
	if (!photo) {
		res.status(404).send({
			status: 'fail',
			data: 'Photo not found',
		});
		return;
	}

	try {
		// delete photo from database
		photo.destroy().then();

		// detach photos from all albums
		photo.albums().detach();

		res.status(200).send({
			status: 'success',
			data: 'Photo is deleted',
		});
	} catch {
		res.status(500).send({
			status: 'error',
			data: 'Exception thrown in database when deleting photo.',
		})
	}

}

module.exports = {
	index,
	show,
	store,
	update,
	destroy,
}
