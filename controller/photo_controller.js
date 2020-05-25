/**
 * Photo Controller
 */

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
const store = (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method not allowed.',
	})
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
