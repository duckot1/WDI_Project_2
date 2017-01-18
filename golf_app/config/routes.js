const express = require('express');
const router  = express.Router();


const authentications = require('../controllers/authentications');
const users = require('../controllers/users');
const places = require('../controllers/places');
const teams = require('../controllers/teams');

router.route('/users').get(users.index);

router.route('/register').post(authentications.register);
router.route('/login').post(authentications.login);

router.route('/places').get(places.index);

router.route('/teams').get(teams.index);

module.exports = router;
