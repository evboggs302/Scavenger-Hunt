"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchResponses = exports.fetchHuntData = exports.activateHunt = exports.createClues = exports.createTeams = exports.createHunt = exports.fetchActiveUser = exports.sendLogin = void 0;
var axios_1 = __importDefault(require("axios"));
var sendLogin = function (uname, pw) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1.default.post("/api/user/login", { userName: uname, password: pw })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.sendLogin = sendLogin;
var fetchActiveUser = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1.default
                    .get("/api/user/getAll")
                    .then(function (res) { return console.log(res.data); })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.fetchActiveUser = fetchActiveUser;
var createHunt = function (name) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1.default
                    .post("/api/hunt/create", { user_id: "6130042d8552f46dd1251951", name: name })
                    .then(function (res) { return console.log(res.data); })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.createHunt = createHunt;
var createTeams = function (hunt_id, teams) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1.default
                    .post("/api/teams/create", { hunt_id: hunt_id, teams: teams })
                    .then(function (res) { return console.log(res.data); })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.createTeams = createTeams;
var createClues = function (hunt_id, clues) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1.default
                    .post("/api/clues/create", { hunt_id: hunt_id, clues: clues })
                    .then(function (res) { return console.log(res.data); })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.createClues = createClues;
var activateHunt = function (hunt_id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1.default.put("/api/hunt/activate", { hunt_id: hunt_id })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.activateHunt = activateHunt;
var fetchHuntData = function (hunt_id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1.default
                    .get("/api/hunt/data", { data: { hunt_id: hunt_id } })
                    .then(function (res) { return console.log(res.data); })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.fetchHuntData = fetchHuntData;
var fetchResponses = function (hunt_id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1.default.get("/api/response/allByHunt", { data: { hunt_id: hunt_id } })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.fetchResponses = fetchResponses;
