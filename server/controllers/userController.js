// import the Model/Schema mongoose created
const User = require("./models/users");
const mongoose = require("mongoose");
const Bcrypt = require("bcryptjs");

module.exports = {
  getAllUsers: (req, res, next) => {
    User.find({}).then((users) => {
      res.status(200).send(users);
    });
  },
  getSingleUser: (req, res, next) => {
    const { id } = req.body;
    User.findById(id)
      .exec()
      .then((user) => {
        const { userName, _id, hunts, firstName, lastName } = user;
        res.status(200).send({ userName, _id, hunts, firstName, lastName });
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },
  userNameValidation: (req, res, next) => {
    const { userName } = req.body;
    User.find({ userName: userName })
      .exec()
      .then((found) => {
        return found.length > 0
          ? res.status(500).send({ message: "Username already exists." })
          : next(); // addUser()
      });
  },
  addUser: (req, res, next) => {
    const { firstName, lastName, userName, password } = req.body;
    let hashedPw = Bcrypt.hashSync(password, 10);
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      userName: userName,
      password: hashedPw,
      firstName: firstName,
      lastName: lastName,
      events: [],
    });
    user.save((err) => {
      if (err) res.status(400).send({ error: err });
      req.body.id = user._id;
      next();
    });
  },
  removeHuntFromUser: (req, res, next) => {
    const { user_id, hunt_id } = req.body;
    const h_id = mongoose.Types.ObjectId(hunt_id);
    const u_id = mongoose.Types.ObjectId(user_id);
    User.updateOne({ _id: u_id }, { $pull: { hunts: h_id } })
      .exec()
      .then((data, err) => {
        if (err) return res.status(418).send({ ErrRemovingHuntFromUser: err });
        return next();
      });
  },
  login: async (req, res, next) => {
    const { userName, password } = req.body;
    try {
      var user = await User.findOne({
        userName: userName,
      }).exec();
      if (!user) {
        return res.status(400).send({ message: "The userName does not exist" });
      } else if (!Bcrypt.compareSync(password, user.password)) {
        return res.status(400).send({ message: "The password is invalid" });
      } else {
        // res.status(200).send(user); // for PostMan
        const { userName, _id, events, firstName, lastName, hunts } = user;
        req.session.user = { userName, _id, events, firstName, lastName };
        res
          .status(200)
          .send({ userName, _id, events, firstName, lastName, hunts });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  },
  logout: (req, res, next) => {
    req.session.destroy();
    res.status(200).send("logged out dude!");
  },
};