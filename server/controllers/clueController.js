// import the Model/Schema mongoose created
const Clue = require("./models/clues");
const mongoose = require("mongoose");

module.exports = {
  createClues: (req, res, next) => {
    const { hunt_id, cluesList } = req.body;
    const h_id = mongoose.Types.ObjectId(hunt_id);
    const mappedClues = cluesList.map((item, index) => {
      return {
        hunt_id: h_id,
        order_number: index + 1,
        description: item,
      };
    });
    Clue.insertMany(mappedClues, { ordered: true }).then((data, err) => {
      if (err) return res.status(500).send({ insertingCluesErr: err });
      return next();
    });
  },
  getCluesByHunt: (req, res, next) => {
    const { hunt_id } = req.body;
    const h_id = mongoose.Types.ObjectId(hunt_id);
    Clue.aggregate([
      {
        $match: { hunt_id: h_id },
      },
      { $sort: { order_number: 1 } },
    ]).then((clues, err) => {
      if (err) return res.status(418).send({ ErrFindingCluesByHunt: err });
      return res.status(200).send(clues);
    });
  },
  updateSingleClue: (req, res, next) => {
    const { clue_id, newDesc } = req.body;
    const cl_id = mongoose.Types.ObjectId(clue_id);
    Clue.updateOne({ _id: cl_id }, [
      {
        $set: {
          description: {
            $cond: [
              { $ne: [newDesc, "$description"] },
              newDesc,
              "$description",
            ],
          },
        },
      },
    ])
      .exec()
      .then((clue, err) => {
        if (err) return res.status(500).send({ clueUpdateErr: err });
        return next();
      });
  },
  updateClueOrder: () => {},
  deleteSingleClue: (req, res, next) => {
    const { clue_id } = req.body;
    const cl_id = mongoose.Types.ObjectId(clue_id);
    Clue.deleteOne({ _id: cl_id })
      .exec()
      .then((data, err) => {
        if (err) return res.status(418).send({ ErrDeleteClue: err });
        return next();
      });
  },
  deleteAllCluesByHunt: (req, res, next) => {
    const { hunt_id } = req.body;
    const h_id = mongoose.Types.ObjectId(hunt_id);
    Clue.deleteMany({ hunt_id: h_id })
      .exec()
      .then((data, err) => {
        if (err) return res.status(418).send({ ErrDelettingAllClues: err });
        return next();
      });
  },
};
