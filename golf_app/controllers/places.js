const Place = require('../models/place');
const Activity = require('../models/activity');

function placesIndex (req, res) {
  Place.find({})
  .populate('activities')
  .exec((err, data) => {
    if (err) return res.status(500).json({ message: 'something went wrong' });
    return res.status(200).json({ message: 'you done it', data });
  });
}

module.exports = {
  index: placesIndex
};
