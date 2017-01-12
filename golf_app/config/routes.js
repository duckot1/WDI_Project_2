const express = require('express');
const router  = express.Router();


const authentications = require('../controllers/authentications');
const users = require('../controllers/users');
const courses = require('../controllers/courses');

router.route('/users').get(users.index);

router.route('/register').post(authentications.register);
router.route('/login').post(authentications.login);

router.route('/courses').get(courses.send);

module.exports = router;
