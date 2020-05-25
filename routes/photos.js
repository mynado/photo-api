const express = require('express');
const router = express.Router();
const models = require('../models');

/* GET / */
router.get('/', (req, res) => {
	res.send({
		status: 'all the photos'
	});
});

module.exports = router;
