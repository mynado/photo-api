/**
 * Albums Route
 */

const express = require('express');
const router = express.Router();
const { createRules, addPhotosRules } = require('../validation_rules/album')
const albumController = require('../controller/album_controller');


/* Get all resources */
router.get('/', albumController.index);

/* Get a specific resource */
router.get('/:albumId', albumController.show);

/* Store a new resource */
router.post('/', createRules, albumController.store);

router.post('/', addPhotosRules, albumController.addPhoto);

// /* Update a specific resource */
// router.put('/:photoId', updateRules, photoController.update);

// /* Destroy a specific resource */
// router.delete('/:photoId', photoController.destroy);

module.exports = router;
