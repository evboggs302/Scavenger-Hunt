"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendHint = exports.markResponseCorrect = exports.fetchResponses = exports.fetchTeamsByHunt = exports.fetchUserHunts = exports.fetchHuntData = exports.activateHunt = exports.createClues = exports.createTeams = exports.createHunt = exports.fetchActiveUser = exports.sendLogin = void 0;
const axios_1 = require("axios");
const sendLogin = async (uname, pw) => {
    return await axios_1.default.post("/api/user/login", { userName: uname, password: pw });
};
exports.sendLogin = sendLogin;
const fetchActiveUser = async () => {
    return await axios_1.default
        .get("/api/user/getAll")
        .then((res) => console.log(res.data));
};
exports.fetchActiveUser = fetchActiveUser;
const createHunt = async (name) => {
    return await axios_1.default.post("/api/hunt/create", {
        user_id: "6130042d8552f46dd1251951",
        name,
    });
    // .then((res) => console.log(res.data));
};
exports.createHunt = createHunt;
const createTeams = async (hunt_id, teams) => {
    return await axios_1.default.post("/api/teams/create", { hunt_id, teams });
    // .then((res) => console.log(res.data));
};
exports.createTeams = createTeams;
const createClues = async (hunt_id, cluesList) => {
    return await axios_1.default.post("/api/clues/create", { hunt_id, cluesList });
    // .then((res) => console.log(res.data));
};
exports.createClues = createClues;
const activateHunt = async (hunt_id) => {
    const { data } = await axios_1.default.put("/api/hunt/activate", { hunt_id });
    return data;
};
exports.activateHunt = activateHunt;
const fetchHuntData = async (hunt_id) => {
    const { data } = await axios_1.default.get(`/api/hunt/data/${hunt_id}`);
    return data;
};
exports.fetchHuntData = fetchHuntData;
const fetchUserHunts = async (user_id) => {
    return await axios_1.default.get("/api/hunt/byUser", { data: { user_id } });
    // .then((res) => console.log(res.data));
};
exports.fetchUserHunts = fetchUserHunts;
const fetchTeamsByHunt = async (hunt_id) => {
    const { data } = await axios_1.default.get(`/api/teams/byHunt/${hunt_id}`);
    return data;
};
exports.fetchTeamsByHunt = fetchTeamsByHunt;
const fetchResponses = async (hunt_id) => {
    const { data } = await axios_1.default.get(`/api/response/allByHunt/${hunt_id}`);
    return data;
};
exports.fetchResponses = fetchResponses;
const markResponseCorrect = async (response_id) => {
    const { data } = await axios_1.default.put(`/api/response/markCorrect`, {
        response_id,
    });
    return data;
};
exports.markResponseCorrect = markResponseCorrect;
const sendHint = async (response_id, team_id, hint) => {
    const { data } = await axios_1.default.post(`/api/response/sendHint`, {
        response_id,
        team_id,
        hint_body: hint,
    });
    return data;
};
exports.sendHint = sendHint;
