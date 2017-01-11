const express = require('express');
const router  = express.Router();


const authentications = require('../controllers/authentications');
const users = require('../controllers/users');


router.route('/register').post(authentications.register);

router.route('/users').get(users.index);


module.exports = router;
