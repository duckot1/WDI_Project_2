const Team = require('../models/team');

function teamsIndex (req, res) {
  Team.find({}, (err, teams) => {
    if (err) return res.status(500).json({ message: 'something went wrong' });
    return res.status(200).json({ message: 'you done it', teams });
  });
}

module.exports = {
  index: teamsIndex
};
