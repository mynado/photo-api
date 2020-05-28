/**
 * Albums Route
 */

const express = require('express');
const router = express.Router();
const { createRules, addPhotosRules, updateRules } = require('../validation_rules/album')
const albumController = require('../controller/album_controller');


/* Get all resources */
router.get('/', albumController.index);

/* Get a specific resource */
router.get('/:albumId', albumController.show);

/* Store a new resource */
router.post('/', createRules, albumController.store);

/* Store an existing resource in a specific resource */
router.post('/:albumId/photos', addPhotosRules, albumController.addPhoto);

/* Update an album */
router.put('/:albumId', updateRules, albumController.update);

/* Remove a photo from a specific album */
router.delete('/:albumId/photo/:photoId', albumController.removePhoto);

/* Destroy an album */
router.delete('/:albumId', albumController.destroy);

module.exports = router;
