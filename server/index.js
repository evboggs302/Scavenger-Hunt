require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").Server(app);
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { MONGO_CONNECTION, SESSION_SECRET } = process.env;
const {
  getAllUsers,
  getSingleUser,
  userNameValidation,
  addUser,
  removeHuntFromUser,
  login,
  logout,
} = require("./controllers/userController");
const {
  getHuntData,
  getUserHunts,
  createHunt,
  addHuntToUser,
  validateActiveHunts,
  updateHunt,
  activateHunt,
  deleteHunt,
} = require("./controllers/huntsController");
const {
  phoneValidation,
  createTeams,
  getTeamsByHunt,
  updateTeam,
  deleteSingleTeam,
  deleteAllTeamsByHunt,
} = require("./controllers/teamsController");
const {
  createClues,
  getCluesByHunt,
  updateSingleClue,
  updateClueOrder,
  deleteSingleClue,
  deleteAllCluesByHunt,
} = require("./controllers/clueController");
const {
  findActiveTeamByDevice,
  saveSMS,
  saveMMS,
  sendClue,
  // deleteAllResponsesByTeam,
  deleteAllResponsesByHunt,
} = require("./controllers/responseController");

// SERVER INIT
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// SESSIONS
const session = require("express-session");
app.use(
  session({
    saveUninitialized: false,
    secret: SESSION_SECRET,
    resave: true,
    cookie: {
      secure: "auto",
      maxAge: 1000 * 60 * 60 * 24, // 24 cookie
    },
  })
);

// MONGODB Connection
mongoose
  .connect(MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log(`✅ Connected to Database\n`))
  // .then((str) => console.log(str))
  .catch(() => console.log(`🚫 Mongo failed\n`));

// USER & AUTH ENDPOINTS
app.get("/api/get_test", (req, res) => {
  res.send("congrats on getting info");
}); // PostMan Confirmed ✅
app.get("/api/user/getAll", getAllUsers); // PostMan Confirmed ✅
app.get("/api/user/getOne", getSingleUser); // PostMan Confirmed ✅
app.post("/api/user/create", userNameValidation, addUser, getSingleUser); // PostMan Confirmed ✅
app.post("/api/user/login", login); // PostMan Confirmed ✅
app.get("/api/user/logout", logout); // 🚨 test when the UI facilitates 🚨

// HUNT ENDPOINTS
app.post("/api/hunt/create", createHunt, addHuntToUser, getHuntData); // PostMan Confirmed ✅
app.get("/api/hunt/byUser", getUserHunts); // PostMan Confirmed ✅
app.get("/api/hunt/data", getHuntData); // PostMan Confirmed ✅
app.put("/api/hunt/activate", validateActiveHunts, activateHunt, getHuntData); // PostMan Confirmed ✅
app.put("/api/hunt/updateOne", updateHunt, getHuntData); // PostMan Confirmed ✅
app.delete(
  "/api/hunt/delete",
  removeHuntFromUser,
  deleteAllTeamsByHunt,
  deleteAllCluesByHunt,
  deleteAllResponsesByHunt,
  deleteHunt
); // PostMan Confirmed ✅

// TEAMS ENDPOINTS
app.post("/api/teams/create", phoneValidation, createTeams, getHuntData); // PostMan Confirmed ✅
app.get("/api/teams/byHunt", getTeamsByHunt); // PostMan Confirmed ✅
app.put("/api/teams/updateOne", updateTeam, getTeamsByHunt); // PostMan Confirmed ✅
app.delete("/api/teams/deleteOne", deleteSingleTeam, getTeamsByHunt); // PostMan Confirmed ✅
app.delete(
  "/api/teams/deleteAll",
  deleteAllTeamsByHunt,
  // deleteAllResponsesByTeam,
  getTeamsByHunt
); // PostMan Confirmed ✅

// CLUES ENDPOINTS
app.post("/api/clues/create", createClues, getCluesByHunt); // PostMan Confirmed ✅
app.get("/api/clues/byHunt", getCluesByHunt); // PostMan Confirmed ✅
app.put("/api/clues/updateOne", updateSingleClue, getCluesByHunt); // PostMan Confirmed ✅
app.put("/api/clues/updateOrder", updateClueOrder, getCluesByHunt); // 🚧 Currently in development 🚧
app.delete("/api/clues/deleteOne", deleteSingleClue, getCluesByHunt); // PostMan Confirmed ✅
app.delete("/api/clues/deleteAll", deleteAllCluesByHunt, getCluesByHunt); // PostMan Confirmed ✅

// RESPONSES ENDPOINTS --> Twilio for responses, GridFS for images
// app.post("/sms", findActiveTeamByDevice, saveSMS, saveMMS); // Confirmed with sending test SMS and MMS messages
app.post("/api/test/findActiveTeam", findActiveTeamByDevice, saveSMS, saveMMS); // PostMan Confirmed ✅
app.post("/api/twilio/sendClue", sendClue); // 🚧 Currently in development 🚧
/**
 *  UP NEXT...
 * mark response as correct upon approval
 * get next clue
 * grab clue_id and save it to team
 * send out next clue, or final response
 **/

// Becasue of browser router, you need the below lines.
// const path = require("path");
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/../build/index.html"));
// });

server.listen(22306, () => console.log(`SERVER on 💩 port: ${22306}`));
