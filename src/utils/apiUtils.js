import axios from "axios";

export const sendLogin = async (uname, pw) => {
  return await axios.post("/api/user/login", { userName: uname, password: pw });
};

export const fetchActiveUser = async () => {
  return await axios
    .get("/api/user/getAll")
    .then((res) => console.log(res.data));
};

export const createHunt = async (user_id, name) => {
  return await axios
    .post("/api/hunt/create", { user_id, name })
    .then((res) => console.log(res.data));
};

export const createTeams = async (hunt_id, teams) => {
  return await axios
    .post("/api/teams/create", { hunt_id, teams })
    .then((res) => console.log(res.data));
};

export const createClues = async (hunt_id, clues) => {
  return await axios
    .post("/api/clues/create", { hunt_id, clues })
    .then((res) => console.log(res.data));
};

export const activateHunt = async (hunt_id) => {
  return await axios.put("/api/hunt/activate", { hunt_id });
};

export const fetchHuntData = async (hunt_id) => {
  return await axios
    .get("/api/hunt/data", { hunt_id })
    .then((res) => console.log(res.data));
};

export const fetchResponses = async (hunt_id) => {
  return await axios
    .get("/api/response/allByHunt", { hunt_id })
    .then((res) => console.log(res.data));
};
