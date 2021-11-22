require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").Server(app);
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { MONGO_CONNECTION, SESSION_SECRET } = process.env;
const {
  getAllUsers,
  getActiveUser,
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
  validateHuntActivation,
  validateHuntNotActive,
  updateHunt,
  activateHunt,
  deactivateHunt,
  deleteHunt,
} = require("./controllers/huntsController");
const {
  phoneValidation,
  createTeams,
  activateTeams,
  updateTeam,
  deleteSingleTeam,
  deleteAllTeamsByHunt,
} = require("./controllers/teamsController");
const {
  createClues,
  getAllCluesByHunt,
  getFirstClue,
  updateDesc,
  updateClueOrder,
  deleteSingleClue,
  deleteAllCluesByHunt,
} = require("./controllers/clueController");
const {
  findActiveTeamByDevice,
  saveSMS,
  saveMMS,
  getAllResponsesByHunt,
  markResCorrect,
  getNextClue,
  sendClue,
  sendFirstClue,
  sendHint,
  deleteAllResponsesByTeam,
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
app.get("/api/user/getAll", getAllUsers); // Postman Confirmed ✅
app.get("/api/user/active", getActiveUser); // Postman Confirmed ✅
app.get("/api/user/getOne", getSingleUser); // Postman Confirmed ✅
app.post("/api/user/create", userNameValidation, addUser, getSingleUser); // Postman Confirmed ✅
app.post("/api/user/login", login); // Postman Confirmed ✅
app.get("/api/user/logout", logout); // test when the UI facilitates

// HUNT ENDPOINTS
app.post("/api/hunt/create", createHunt, addHuntToUser, getHuntData); // Postman Confirmed ✅
app.get("/api/hunt/byUser", getUserHunts); // Postman Confirmed ✅
app.get("/api/hunt/data/:id", getHuntData); // Postman Confirmed ✅
app.put(
  "/api/hunt/activate",
  validateHuntActivation,
  activateHunt,
  activateTeams,
  getFirstClue,
  sendFirstClue
); // Postman Confirmed ✅
app.put("/api/hunt/deactivate", deactivateHunt, getHuntData); // Postman Confirmed ✅
app.put("/api/hunt/updateOne", validateHuntNotActive, updateHunt, getHuntData); // Postman Confirmed ✅
app.delete(
  "/api/hunt/delete",
  validateHuntNotActive,
  deleteAllResponsesByHunt,
  deleteAllTeamsByHunt,
  deleteAllCluesByHunt,
  deleteHunt,
  removeHuntFromUser
); // Postman Confirmed ✅

// TEAMS ENDPOINTS
app.post(
  "/api/teams/create",
  validateHuntNotActive,
  phoneValidation,
  createTeams,
  getHuntData
); // Postman Confirmed ✅
app.get("/api/teams/byHunt/:id", getHuntData); // Postman Confirmed ✅
app.put("/api/teams/updateOne", validateHuntNotActive, updateTeam, getHuntData); // Postman Confirmed ✅
app.delete(
  "/api/teams/deleteOne",
  validateHuntNotActive,
  deleteSingleTeam,
  getHuntData
); // Postman Confirmed ✅
app.delete(
  "/api/teams/deleteAll",
  validateHuntNotActive,
  deleteAllTeamsByHunt,
  deleteAllResponsesByTeam,
  getHuntData
); // Postman Confirmed ✅

// CLUES ENDPOINTS
app.post("/api/clues/create", createClues, getAllCluesByHunt); // Postman Confirmed ✅
app.get("/api/clues/allByHunt", getAllCluesByHunt); // Postman Confirmed ✅
app.put(
  "/api/clues/updateDesc",
  validateHuntNotActive,
  updateDesc,
  getAllCluesByHunt
); // Postman Confirmed ✅
app.put(
  "/api/clues/updateOrder",
  validateHuntNotActive,
  updateClueOrder,
  getAllCluesByHunt
); // Postman Confirmed ✅
app.delete(
  "/api/clues/deleteOne",
  validateHuntNotActive,
  deleteSingleClue,
  getAllCluesByHunt
); // Postman Confirmed ✅
app.delete(
  "/api/clues/deleteAll",
  validateHuntNotActive,
  deleteAllCluesByHunt,
  getAllCluesByHunt
); // Postman Confirmed ✅

// RESPONSES ENDPOINTS --> Twilio for responses
app.post("/sms", findActiveTeamByDevice, saveSMS, saveMMS); // Postman Confirmed ✅
app.put("/api/response/markCorrect", markResCorrect, getNextClue, sendClue); // Postman Confirmed ✅
app.post("/api/response/sendHint", sendHint); // Postman Confirmed ✅
app.get("/api/response/allByHunt/:id", getAllResponsesByHunt); // Postman Confirmed ✅

// Becasue of browser router, you need the below lines.
const path = require("path");
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/../build/index.html"));
// });
app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

server.listen(22306, () => console.log(`SERVER on 💩 port: ${22306}`));
