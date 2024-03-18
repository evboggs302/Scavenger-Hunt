// import React from "react";
// import { useAppSelector } from "../../../dux/stateHooks";
// // import "./Resp.scss";

// const ResponseTile = ({ response, index, markCorrect, sendHint }) => {
//   const { clues } = useAppSelector((state) => state);
//   //   const clue = clues.filter((cl) => cl._id === response.clue_id);
//   let date = new Date(response.time_received);
//   return (
//     <section className="respTile">
//       {response.response_img ? (
//         response.response_img.map((img: string) => {
//           return <img className="respIMG" src={img} alt="response img" />;
//         })
//       ) : (
//         <p>{response.response_txt}</p>
//       )}
//       <br />
//       {/* <p>CLUE: </p> */}
//       <p>
//         Time Received:{" "}
//         {new Intl.DateTimeFormat("default", {
//           hour: "numeric",
//           minute: "numeric",
//           second: "numeric",
//         }).format(date)}
//       </p>
//       <br />
//       <span className="vaidation-button-container">
//         <button
//           onClick={() =>
//             sendHint(
//               response._id,
//               response.team_id,
//               "Nope! Try Again. If you get stuck, call Aunt Lo."
//             )
//           }>
//           Incorrect
//         </button>
//         <button onClick={() => markCorrect(response._id)}>Correct!</button>
//       </span>
//     </section>
//   );
// };
// export default ResponseTile;
