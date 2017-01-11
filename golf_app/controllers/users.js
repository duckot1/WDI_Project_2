




// const User = require('../models/user');
//
// function userIndex (req, res) {
//   User.find({}, (err, users) => {
//     if (err) return res.status(500).json({ meassage: 'something went wrong' });
//     return res.status(200).json(users);
//   });
// }
//
// function userShow (req, res) {
//   User.findById(req.params.id, (err, user) => {
//     if (err) return res.status(500).json({ message: 'something went wrong' });
//     return res.status(200).json(user);
//   })
// }
//
// module.exports = {
//   index: userIndex
//   show: userShow
// };
