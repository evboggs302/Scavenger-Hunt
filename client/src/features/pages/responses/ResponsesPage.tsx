// import { useEffect } from "react";
// import { useQuery } from "react-query";
// import { useHistory } from "react-router-dom";
// import ResponseTile from "./ResponseTile";
// import {
//   fetchResponses,
//   markResponseCorrect,
//   sendHint,
// } from "../../../utils/apiUtils";
// import { useAppSelector } from "../../../dux/stateHooks";
// import React from "react";
// // import "./Resp.scss";

// const ResponsesPage = () => {
//   const state = useAppSelector((state) => state);
//   let history = useHistory();

//   useEffect(() => {
//     if (!state.hunt._id) {
//       history.push("/");
//     }
//   }, []);

//   const responses = useQuery({
//     queryKey: "responses",
//     queryFn: async () => {
//       const data = await fetchResponses(state.hunt._id);
//       console.log(data);
//       return data[0].allResponses;
//     },
//     refetchInterval: 1000,
//   });

//   const markCorrect = (response_id) => {
//     return markResponseCorrect(response_id);
//   };
//   const sendHintInstead = async (response_id, team_id, hint) => {
//     return sendHint(response_id, team_id, hint);
//   };

//   return (
//     <div>
//       <h3>Responses PAGE</h3>
//       <br />
//       {responses.isLoading && <h5>Fetching Responses...</h5>}
//       <div className="responseContainer">
//         {responses.status === "success" &&
//           responses.data.map((resp, dex) => {
//             return !resp.correct && !resp.hintSent ? (
//               <ResponseTile
//                 key={resp._id}
//                 response={resp}
//                 index={dex}
//                 markCorrect={markCorrect}
//                 sendHint={sendHintInstead}
//               />
//             ) : null;
//           })}
//       </div>
//     </div>
//   );
// };
// export default ResponsesPage;
