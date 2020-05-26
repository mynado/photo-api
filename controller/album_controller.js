/**
 * Album Controller
 */

const models = require('../models');

 /**
  * Get all resources
  * GET /
  */
const index = async (req, res) => {
	const allAlbums = await new models.Album({}).fetchAll();

	res.status(200).send({
		status: 'success',
		data: {
			photo: allAlbums,
		}
	});
}

/**
 * Get a specific resource
 * GET /:albumId
 */
const show = async (req, res) => {
	const album = await new models.Album({ id: req.params.albumId }).fetch({ withRelated: ['photos'] });

	res.status(200).send({
		status: 'success',
		data: {
			album,
		}
	})
}

/**
 * Store a new resource
 * POST /
 */
// const store = async (req, res) => {
// 	// find the validation errors
// 	const errors = validationResult(req);
// 	if (!errors.isEmpty()) {
// 		res.status(422).send({
// 			status: 'fail',
// 			data: errors.array(),
// 		});
// 		return;
// 	}

// 	// extract valid data
// 	const validData = matchedData(req);

// 	// insert valid data into database
// 	try {
// 		const photo = await models.Photo.forge(validData).save();
// 		res.status(200).send({
// 			status: 'success',
// 			data: photo,
// 		});

// 	} catch (error) {
// 		res.status(500).send({
// 			status: 'error',
// 			data: 'Exception thrown in the database when creating a new photo.'
// 		});
// 		throw error;
// 	}

// }


/**
 * Update a specific resource
 * PUT /:photoId
 */
// const update = async (req, res) => {

// 	// get photo
// 	const photo = await new models.Photo({ id: req.params.photoId }).fetch({ require: false });

// 	// check if photo exists
// 	if (!photo) {
// 		res.status(404).send({
// 			status: 'fail',
// 			data: 'Photo not found',
// 		});
// 		return;
// 	}

// 	// find the validation errors
// 	const errors = validationResult(req);
// 	if (!errors.isEmpty()) {
// 		// fail
// 		res.status(422).send({
// 			status: 'fail',
// 			data: errors.array(),
// 		});
// 		return;
// 	}

// 	// extract valid data
// 	const validData = matchedData(req);
// 	try {
// 		// update valid data into specific user
// 		const updatedPhoto = await photo.save(validData);

// 		res.status(200).send({
// 			status: 'success',
// 			data: {
// 				photo: updatedPhoto,
// 			},
// 		});

// 	} catch (error) {
// 		res.status(500).send({
// 			status: 'error',
// 			data: 'Exception thrown in database when updating a specific photo.'
// 		})
// 	}
// }

/**
 * Destroy a specific resource
 * DELETE /:photoId
 */
// const destroy = async (req, res) => {
// 	try {
// 		await new models.Photo({id: req.params.photoId}).destroy().then();

// 		res.status(200).send({
// 			status: 'success',
// 			data: 'Photo is deleted',
// 		})
// 	} catch {
// 		res.status(500).send({
// 			status: 'error',
// 			data: 'Exception thrown in database when deleting photo.',
// 		})
// 	}

// }

module.exports = {
	index,
	show,
	// store,
	// update,
	// destroy,
}
