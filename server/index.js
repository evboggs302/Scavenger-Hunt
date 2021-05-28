require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").Server(app);
const mongoose = require("mongoose");
const { MONGO_CONNECTION, SESSION_SECRET } = process.env;
const {
  getAllUsers,
  getSingleUser,
  userNameValidation,
  addUser,
  login,
  logout,
} = require("./controllers/userController");
const {
  getHuntData,
  getUserHunts,
  createHunt,
  updateHunt,
  deleteHunt,
} = require("./controllers/huntsController");
// const {} = require("./controllers/teamsController");
// const {} = require("./controllers/clueController");
// const {} = require("./controllers/responseController");
const { sendText } = require("./controllers/twilioController");

// SERVER INIT
app.use(express.json());

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
  })
  .then(() => console.log(`✅ Connected to Database`))
  .catch(() => console.log(`🚫 Mongo failed`));

// USER & AUTH ENDPOINTS
app.get("/api/get_test", (req, res) => {
  res.send("congrats on getting info");
}); // PostMan Confirmed ✅
app.get("/api/getAllUsers", getAllUsers); // PostMan Confirmed ✅
app.get("/api/getUser", getSingleUser); // PostMan Confirmed ✅
app.post("/api/addUser", userNameValidation, addUser, getSingleUser); // PostMan Confirmed ✅
app.post("/api/login", login); // PostMan Confirmed ✅
app.get("/api/logout", logout); // test when the UI facilitates 🚨

// HUNT ENDPOINTS
app.post("/api/createHunt", createHunt, getHuntData); // PostMan Confirmed ✅
app.get("/api/getUserHunts", getUserHunts); // PostMan Confirmed ✅
app.get("/api/getHunt", getHuntData); // PostMan Confirmed ✅
app.put("/api/updateHunt", updateHunt);
app.delete("/api/deleteHunt", deleteHunt); // PostMan Confirmed ✅

// TEAMS ENDPOINTS

// CLUE ENDPOINTS

// TWILIO & RESPONSES ENDPOINTS --> Twilio for texts, GridFS for images
app.post("/api/sendtxt", sendText);

// Becasue of browser router, you need the below lines.
// const path = require("path");
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/../build/index.html"));
// });

server.listen(22306, () => console.log(`SERVER on 💩 port: ${22306}`));
