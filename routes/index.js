const express = require('express');
const router = express.Router();

/* GET / */
router.get('/', (req, res) => {
	res.send({
		status: 'you had me at hello'
	});
});

router.use('/photos', require('./photos'));
router.use('/albums', require('./albums'));

module.exports = router;
