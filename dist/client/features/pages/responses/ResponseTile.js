"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
require("./Resp.scss");
const ResponseTile = ({ response, index, markCorrect, sendHint }) => {
    const { clues } = (0, react_redux_1.useAppSelector)((state) => state);
    //   const clue = clues.filter((cl) => cl._id === response.clue_id);
    let date = new Date(response.time_received);
    return (React.createElement("section", { className: "respTile" },
        response.response_img ? (response.response_img.map((img) => {
            return React.createElement("img", { className: "respIMG", src: img, alt: "response img" });
        })) : (React.createElement("p", null, response.response_txt)),
        React.createElement("br", null),
        React.createElement("p", null,
            "Time Received:",
            " ",
            new Intl.DateTimeFormat("default", {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
            }).format(date)),
        React.createElement("br", null),
        React.createElement("span", { className: "vaidation-button-container" },
            React.createElement("button", { onClick: () => sendHint(response._id, response.team_id, "Nope! Try Again. If you get stuck, call Aunt Lo.") }, "Incorrect"),
            React.createElement("button", { onClick: () => markCorrect(response._id) }, "Correct!"))));
};
exports.default = ResponseTile;
