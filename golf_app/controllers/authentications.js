const User = require('../models/user');

function authenticationsRegister (req, res) {
  User.create(req.body.user, (err, user) => {
    if (err) return res.status(500).json({ success: false, message: err });
    if (!user) return res.status(500).json({ success: false, message: 'Please send the correct information to create a user.' });
    return res.status(201).json(user);
  });
}



module.exports = {
  register: authenticationsRegister
};
