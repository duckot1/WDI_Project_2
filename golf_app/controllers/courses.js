const Course = require('../models/course');

function sendData (req, res) {
  Course.find({}, (err, data) => {
    if (err) return res.status(500).json({ message: 'something went wrong' });
    return res.status(200).json({ message: 'you done it', data });
  });
}

module.exports = {
  send: sendData
};
