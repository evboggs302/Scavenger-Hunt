require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").Server(app);
// const io = require("socket.io")(server);
const mongoose = require("mongoose");
const {
  ACCT_SID,
  AUTH_TOKEN,
  TWILIO_NUMBER,
  MONGO_CONNECTION,
  SESSION_SECRET,
} = process.env;
const {
  getAllUsers,
  getSingleUser,
  getSingleUserByUserName,
  addUser,
  login,
  logout,
} = require("./controllers/userController");
const {
  getSingleHunt,
  createHunt,
  updateHunt,
  deleteHunt,
} = require("./controllers/huntsController");
// const {} = require("./controllers/teamsController");
// const {} = require("./controllers/clueController");
// const {} = require("./controllers/responseController");

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
}); // PostMan Confirmed
app.get("/api/getAllUsers", getAllUsers); // PostMan Confirmed
app.get("/api/getUser", getSingleUser); // PostMan Confirmed
app.post("/api/addUser", getSingleUserByUserName, addUser); // PostMan Confirmed
app.post("/api/login", login); // PostMan Confirmed
app.get("/api/logout", logout);

// HUNT ENDPOINTS
app.get("/api/getHunt", getSingleHunt); // PostMan Confirmed
app.put("/api/updateHunt");
app.post("/api/createHunt", createHunt);
app.delete("/api/createHunt");

// TEAMS ENDPOINTS

// RESPONSES ENDPOINTS

// CLUE ENDPOINTS

// SOCKET.IO EVENT ENDPOINTS
// io.on("connection", (socket) => {
//   console.log("socket hit");
//   socket.on("get responses", () => {
//     const db = app.get("db");
//     db.shared_community().then((data) => {
//       io.emit("allUnAnswered", data);
//     });
//   });
//   socket.on("disconnect", () => {
//     console.log("DISCONNECTED");
//   });
// });

// TWILIO ENDPOINTS
const client = require("twilio")(ACCT_SID, AUTH_TOKEN);
app.post("/api/sendtxt", (req, res) => {
  let { recipient, sms_msg } = req.body;
  client.messages
    .create({
      body: sms_msg,
      from: `${TWILIO_NUMBER}`,
      to: `+1${recipient}`,
    })
    .then((message) => {
      res.status(200).send(message);
    });
});

// Becasue of browser router, you need the below lines.
// const path = require("path");
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/../build/index.html"));
// });

server.listen(22306, () => console.log(`SERVER on 💩 port: ${22306}`));
