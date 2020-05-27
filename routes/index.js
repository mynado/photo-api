const express = require('express');
const router = express.Router();

const auth = require('../controller/middlewares/auth');
const authController = require('../controller/auth_controller');
const userValidationRules = require('../validation_rules/user');

/* GET / */
router.get('/', (req, res) => {
	res.send({
		status: 'hello from the root'
	});
});

router.use('/photos', [auth.validateJwtToken],require('./photos'));
router.use('/albums', [auth.validateJwtToken], require('./albums'));

router.post('/register', [userValidationRules.createRules], authController.register);

// login and get JWT access token
router.post('/login', authController.login);


module.exports = router;
