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
      next();
    });
  },
  getTeamsByHunt: (req, res, next) => {
    res.send("get teams by hunt :)");
  },
  updateTeam: (req, res, next) => {
    //   const { hunt_id, newName, newDate } = req.body;
    //   const id = mongoose.Types.ObjectId(hunt_id);
    //   const formattedDate = new Date(newDate);
    //   Hunt.updateOne({ _id: id }, [
    //     { $set: { name: { $cond: [newName, newName, "$name"] } } },
    //     { $set: { date: { $cond: [newDate, formattedDate, "$date"] } } },
    //   ])
    //     .exec()
    //     .then((complete, err) => {
    //       if (err) res.status(500).send({ huntUpdateErr: err });
    //       next();
    //     });
  },
  deleteTeam: (req, res, next) => {},
};
