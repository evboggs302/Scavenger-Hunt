// import the User Model/Schema mongoose created
const User = require("./models/users");
const mongoose = require("mongoose");

module.exports = {
  getAllUsers: (req, res, next) => {
    User.find({}).then((users) => {
      res.status(200).send(users);
    });
  },
  getSingleUser: (req, res, next) => {
    const { id } = req.body;
    User.findById(id).then((user) => {
      res.status(200).send(user);
    });
  },
  addUser: (req, res, next) => {
    const { firstName, lastName } = req.body;
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      firstName: firstName,
      lastName: lastName,
      projects: [],
    });
    user.save((err) => {
      console.log("err: ", err);
      if (err) {
        res.status(400).send({ error: err });
      }
      User.find(user._id)
        .exec()
        .then((users) => {
          res.status(200).send(users);
        });
    });
  },
};
