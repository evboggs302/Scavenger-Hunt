// import the Model/Schema mongoose created
const Log = require("./models/event_logs");
const mongoose = require("mongoose");

module.exports = {
  logErr: (funcName, err) => {
    let timeStamp = new Date();
    timeStamp.setFullYear(timeStamp.getFullYear() + 1);
    const newLog = new Log({
      _id: new mongoose.Types.ObjectId(),
      type: "ERROR",
      where: funcName,
      time_stamp: timeStamp,
      body: err,
    });
    newLog.save((err) => {
      if (err) console.log("LOG ERR:", err);
    });
  },
  logData: (data) => {
    let timeStamp = new Date();
    timeStamp.setFullYear(timeStamp.getFullYear() + 1);
    const newLog = new Log({
      _id: new mongoose.Types.ObjectId(),
      type: "DATA",
      time_stamp: timeStamp,
      body: data,
    });
    newLog.save((err) => {
      if (err) console.log("LOG DATA ERR:", err);
    });
  },
  logSignIn: (user) => {
    let timeStamp = new Date();
    timeStamp.setFullYear(timeStamp.getFullYear() + 1);
    const newLog = new Log({
      _id: new mongoose.Types.ObjectId(),
      type: "SIGN_IN",
      time_stamp: timeStamp,
      body: user,
    });
    newLog.save((err) => {
      if (err) console.log("LOG SIGN IN ERR:", err);
    });
  },
  logSignOut: (user) => {
    let timeStamp = new Date();
    timeStamp.setFullYear(timeStamp.getFullYear() + 1);
    const newLog = new Log({
      _id: new mongoose.Types.ObjectId(),
      type: "SIGN_OUT",
      time_stamp: timeStamp,
      body: user,
    });
    newLog.save((err) => {
      if (err) console.log("LOG SIgn OUT ERR:", err);
    });
  },
};
