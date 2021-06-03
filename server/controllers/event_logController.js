// import the Model/Schema mongoose created
const Log = require("./models/event_logs");
const mongoose = require("mongoose");

module.exports = {
  logErr: (funcName, err) => {
    const timeStamp = new Date();
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
    const timeStamp = new Date();
    const newLog = new Log({
      _id: new mongoose.Types.ObjectId(),
      type: "DATA",
      where: " ",
      time_stamp: timeStamp,
      body: data,
    });
    newLog.save((err) => {
      if (err) console.log("LOG DATA ERR:", err);
    });
  },
  logSignIn: (user) => {
    const timeStamp = new Date();
    const newLog = new Log({
      _id: new mongoose.Types.ObjectId(),
      type: "SIGN_IN",
      where: "login",
      time_stamp: timeStamp,
      body: user,
    });
    newLog.save((err) => {
      if (err) console.log("LOG SIGN IN ERR:", err);
    });
  },
  logSignOut: (user) => {
    const timeStamp = new Date();
    const newLog = new Log({
      _id: new mongoose.Types.ObjectId(),
      type: "SIGN_OUT",
      where: "logout",
      time_stamp: timeStamp,
      body: user,
    });
    newLog.save((err) => {
      if (err) console.log("LOG SIGN OUT ERR:", err);
    });
  },
};
