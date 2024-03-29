// import the Model/Schema mongoose created
const Team = require("./models/teams");
const { logErr } = require("./event_logController");
const mongoose = require("mongoose");

module.exports = {
  phoneValidation: (req, res, next) => {
    const { hunt_id, teams } = req.body;
    const mappedPhoneNums = teams.map((team) => team.phone);
    const id = mongoose.Types.ObjectId(hunt_id);
    Team.find({ device_number: { $in: mappedPhoneNums }, hunt_id: id })
      .exec()
      .then((found, err) => {
        try {
          const exists = found.map((fd) => fd.device_number);
          return found.length > 0
            ? res.status(418).send({
                message: "Phone number(s) already in use by another team.",
                phoneNumbers: exists,
              })
            : next();
        } catch {
          logErr("phoneValidation", err);
          return res
            .status(500)
            .send("Error Reported. Please check error logs for more details.");
        }
      });
  },
  createTeams: (req, res, next) => {
    const { hunt_id, teams } = req.body; // phone has to be 11 digits for Twilio
    const id = mongoose.Types.ObjectId(hunt_id);
    const mappedTeams = teams.map((team) => {
      return {
        hunt_id: id,
        members: team.members,
        device_number: `+1${team.phone}`,
      };
    });
    Team.insertMany(mappedTeams).then((data, err) => {
      if (err) {
        logErr("createTeams", err);
        return res
          .status(500)
          .send("Error Reported. Please check error logs for more details.");
      }
      return next();
    });
  },
  activateTeams: (req, res, next) => {
    const { hunt_id } = req.body;
    const h_id = mongoose.Types.ObjectId(hunt_id);
    Team.find({ hunt_id: h_id })
      .exec()
      .then((teams, err) => {
        if (err) {
          logErr("activateTeams", err);
          return res
            .status(500)
            .send("Error Reported. Please check error logs for more details.");
        }
        req.body.device_numbers = teams.map((t) => {
          return t.device_number;
        });
        Team.updateMany({ hunt_id: h_id }, { lastClue_sent: 1 }).then(
          (success, err) => {
            next();
          }
        );
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
        if (err) {
          logErr("updateTeam", err);
          return res
            .status(500)
            .send("Error Reported. Please check error logs for more details.");
        }
        return next();
      });
  },
  deleteSingleTeam: (req, res, next) => {
    const { team_id } = req.body;
    const t_id = mongoose.Types.ObjectId(team_id);
    Team.deleteOne({ _id: t_id })
      .exec()
      .then((data, err) => {
        if (err) {
          logErr("deleteSingleTeam", err);
          return res
            .status(500)
            .send("Error Reported. Please check error logs for more details.");
        }
        return next();
      });
  },
  deleteAllTeamsByHunt: (req, res, next) => {
    const { hunt_id } = req.body;
    const h_id = mongoose.Types.ObjectId(hunt_id);
    Team.deleteMany({ hunt_id: h_id })
      .exec()
      .then((data, err) => {
        if (err) {
          logErr("deleteAllTeamsByHunt", err);
          return res
            .status(500)
            .send("Error Reported. Please check error logs for more details.");
        }
        return next();
      });
  },
};
