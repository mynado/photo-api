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
	const allAlbums = await models.Album.where("user_id", req.user.data.id).fetchAll();

	res.status(200).send({
		status: 'success',
		data: {
			albums: allAlbums,
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

	// query db for photos this user has
	const photos = album.related('photos');

	res.send({
		status: 'success',
		data: {
			photos,
		},
	});
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
		res.status(201).send({
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
 * POST /:albumId/photos
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

	// extract valid data
	const validData = matchedData(req);

	// extract photos
	let photosIds = false;
	if (validData.photos_ids) {
		photosIds = validData.photos_ids;
		delete validData.photos_ids;
	}
	console.log(photosIds)
	try {
		// get album to attach
		const album = await models.Album.fetchById(req.params.albumId);

		// attach photo to album
		const result = await album.photos().attach(photosIds);

		console.log(result);
		res.status(201).send({
			status: 'success',
			data: [
				...result,
			]
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
 * PUT /:albumId
 */
const update = async (req, res) => {
// get album
const album = await new models.Album({ id: req.params.albumId, user_id: req.user.data.id }).fetch({ require: false });

// check if album exists
if (!album) {
	res.status(404).send({
		status: 'fail',
		data: 'Album not found',
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
console.log(validData)

try {
	// update valid data into specific user
	const updatedAlbum = await album.save(validData);

	res.status(200).send({
		status: 'success',
		data: {
			photo: updatedAlbum,
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
 * Destroy a specific resource from a specific resource
 * DELETE /:albumId/photos/:photoId
 */
const removePhoto = async (req, res) => {
	// get photo
	const photo = await new models.Photo({ id: req.params.photoId, user_id: req.user.data.id }).fetch({ require: false });
	console.log('Photo:', photo)

	// check if photo exists
	if (!photo) {
		res.status(404).send({
			status: 'fail',
			data: 'Photo not found',
		});
		return;
	}

	// get album
	const album = await new models.Album({ id: req.params.albumId }).fetch({ withRelated: 'photos' });

	// check if album exists
	if (!album) {
		res.status(404).send({
			status: 'fail',
			data: 'Album not found',
		});
		return;
	}

	try {
		// delete photo from album
		album.photos().detach(photo);

		res.status(200).send({
			status: 'success',
			data: 'Photo is deleted',
		})
	} catch {
		res.status(500).send({
			status: 'error',
			data: 'Exception thrown in database when deleting photo from album.',
		})
	}
}

/**
 * Destroy a specific resource
 * DELETE /:albumId
 */
const destroy = async (req, res) => {
	// get album
	const album = await new models.Album({
			id: req.params.albumId,
			user_id: req.user.data.id,
		}).fetch({
			withRelated: 'photos',
			require: false,
		});

	// check if album exists
	if (!album) {
		res.status(404).send({
			status: 'fail',
			data: 'Album not found',
		});
		return;
	}

	try {
		// delete album and all its' relations
		album.destroy().then();
		album.photos().detach();

		res.status(200).send({
			status: 'success',
			data: 'Album is deleted',
		})
	} catch {
		res.status(500).send({
			status: 'error',
			data: 'Exception thrown in database when deleting an album.',
		})
	}
}

module.exports = {
	index,
	show,
	store,
	addPhoto,
	update,
	removePhoto,
	destroy,
}
