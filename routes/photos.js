const express = require('express');
const router = express.Router();
const photoController = require('../controller/photo_controller');

/* Get all resources */
router.get('/', photoController.index);

/* Get a specific resource */
router.get('/:photoId', photoController.show);

/* Store a new resource */
router.post('/', photoController.store);

/* Update a specific resource */
router.put('/:photoId', photoController.update);

/* Destroy a specific resource */
router.delete('/:photoId', photoController.destroy);

module.exports = router;
