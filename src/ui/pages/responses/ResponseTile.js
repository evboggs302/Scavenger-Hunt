import { useState } from "react";
import "./Resp.scss";

const ResponseTile = ({ response, index, markCorrect, sendHint }) => {
  let date = new Date(response.time_received);
  console.log(response);
  return (
    <section className="respTile">
      {response.response_img ? (
        response.response_img.map((img) => {
          return <img className="respIMG" src={img} alt="response img" />;
        })
      ) : (
        <p>{response.response_txt}</p>
      )}
      {/* .toLocalTimeString("en-us") */}
      <p>
        Time Received:{" "}
        {new Intl.DateTimeFormat("default", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }).format(date)}
      </p>
      <br />
      <span className="vaidation-button-container">
        <button
          onClick={() =>
            sendHint(
              response._id,
              response.team_id,
              "Nope! Try Again. If you get stuck, call Aunt Lo."
            )
          }>
          Incorrect
        </button>
        <button onClick={() => markCorrect(response._id)}>Correct!</button>
      </span>
    </section>
  );
};
export default ResponseTile;
