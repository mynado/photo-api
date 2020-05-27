/**
 * Album Controller
 */

const { validationResult, matchedData } = require('express-validator');
const models = require('../models');

 /**
  * Get all resources
  * GET /
  */
const index = async (req, res) => {
	console.log(req)
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
	// query db for album and load the photos relation
	let album = null;
	try {
		album = await models.Album.fetchById(req.params.albumId, { withRelated: 'photos' });
	} catch (error) {
		console.error(error);
		res.sendStatus(404);
		return;
	}

	// query db for books this user has
	const photos = album.related('photos');

	res.send({
		status: 'success',
		data: {
			photos,
		},
	});

	// const album = await new models.Album({id: req.params.albumId}).fetch({ withRelated: ['photos'] });

	// res.status(200).send({
	// 	status: 'success',
	// 	data: {
	// 		album,
	// 	}
	// })
}

/**
 * Store a new resource
 * POST /
 */
const store = async (req, res) => {
	const userId = req.user.data.id;
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
		const album = await models.Album.forge(validData).save();
		res.status(200).send({
			status: 'success',
			data: album,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			data: 'Exception thrown in the database when creating a new album.'
		});
		throw error;
	}

}

/**
 * Add a photo to album
 */

const addPhoto = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// fail
		res.status(422).send({
			status: 'fail',
			data: errors.array(),
		})
		return;
	}

	try {
		// get photo and album to attach
		const photo = await models.Photo.fetchById(req.body.photo_id);

		const album = await models.Album.fetchById(req.body.album_id);

		// attach photo to album
		const result = await photo.album().attach(album);

		console.log(result);
		res.status(201).send({
			status: 'success',
			data: result,
		});
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when trying to add photo to album.'
		});
		throw error;
	}
}


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
	store,
	addPhoto,
	// update,
	// destroy,
}
