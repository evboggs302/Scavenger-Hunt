// import the Model/Schema mongoose created
const Response = require("./models/responses");
const mongoose = require("mongoose");

module.exports = {
  deleteAllResponsesByTeam: () => {},
  deleteAllResponsesByHunt: (req, res, next) => {
    const { hunt_id } = req.body;
    const h_id = mongoose.Types.ObjectId(hunt_id);
    Response.deleteMany({ hunt_id: h_id })
      .exec()
      .then((data, err) => {
        if (err) return res.status(418).send({ ErrDelettingAllResponses: err });
        return next();
      });
  },
};
