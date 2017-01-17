const express = require('express');
const router  = express.Router();


const authentications = require('../controllers/authentications');
const users = require('../controllers/users');
const places = require('../controllers/places');

router.route('/users').get(users.index);

router.route('/register').post(authentications.register);
router.route('/login').post(authentications.login);

router.route('/places').get(places.index);

module.exports = router;
