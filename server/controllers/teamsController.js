// import the Model/Schema mongoose created
const Team = require("./models/teams");
const mongoose = require("mongoose");

module.exports = {
  phoneValidation: (req, res, next) => {
    const { hunt_id, teams } = req.body;
    const mappedPhoneNums = teams.map((team) => team.phone);
    const id = mongoose.Types.ObjectId(hunt_id);
    Team.find({ device_number: { $in: mappedPhoneNums }, hunt_id: id })
      .exec()
      .then((found, err) => {
        const exists = found.map((fd) => fd.device_number);
        return found.length > 0
          ? res.status(418).send({
              message: "Phone number(s) already in use by another team.",
              phoneNumbers: exists,
            })
          : next();
      });
  },
  createTeams: (req, res, next) => {
    const { hunt_id, teams } = req.body; // phone has to be 11 digits for Twilio
    const id = mongoose.Types.ObjectId(hunt_id);
    const mappedTeams = teams.map((team) => {
      return {
        hunt_id: id,
        members: team.members,
        device_number: team.phone,
      };
    });
    Team.insertMany(mappedTeams).then((data, err) => {
      if (err) return res.status(500).send({ insertingTeamsErr: err });
      return next();
    });
  },
  getTeamsByHunt: (req, res, next) => {
    const { hunt_id } = req.body;
    const id = mongoose.Types.ObjectId(hunt_id);
    Team.find({ hunt_id: id })
      .exec()
      .then((teams, err) => {
        if (err) return res.status(418).send({ ErrFindingTeamsByHunt: err });
        return res.status(200).send(teams);
      });
  },
  updateTeam: (req, res, next) => {
    const { team_id, newPhone, members } = req.body;
    const t_id = mongoose.Types.ObjectId(team_id);
    Team.updateOne({ _id: t_id }, [
      {
        $set: {
          device_number: { $cond: [newPhone, newPhone, "$device_number"] },
        },
      },
      {
        $set: {
          members: {
            $cond: [
              { $and: [members, { $ne: [members, "$members"] }] },
              members,
              "$members",
            ],
          },
        },
      },
    ])
      .exec()
      .then((complete, err) => {
        if (err) return res.status(500).send({ huntUpdateErr: err });
        return next();
      });
  },
  deleteSingleTeam: (req, res, next) => {
    const { team_id } = req.body;
    const t_id = mongoose.Types.ObjectId(team_id);
    Team.deleteOne({ _id: t_id })
      .exec()
      .then((data, err) => {
        if (err) return res.status(418).send({ ErrDeleteHunt: err });
        return next();
      });
  },
  deleteAllTeamsByHunt: (req, res, next) => {
    const { hunt_id } = req.body;
    const h_id = mongoose.Types.ObjectId(hunt_id);
    Team.deleteMany({ hunt_id: h_id })
      .exec()
      .then((data, err) => {
        if (err) return res.status(418).send({ ErrDelettingAllTeams: err });
        return next();
      });
  },
};
