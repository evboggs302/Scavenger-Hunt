// import React, { useRef } from "react";
// import { useAppSelector, useAppDispatch } from "../../../dux/stateHooks";
// import { useHistory } from "react-router-dom";
// import { setHunt } from "../../../dux/reducers/huntReducer";
// import { createHunt, activateHunt } from "../../../utils/apiUtils";
// // import "./huntspage.scss";

// const HuntsPage = () => {
//   const state = useAppSelector((state) => state);
//   const dispatch = useAppDispatch();
//   const huntName = useRef("");
//   let history = useHistory();

//   const buttonClick = async () => {
//     const { data } = await createHunt(huntName.current);
//     huntName.current = "";
//     return dispatch(setHunt(data[0]));
//   };

//   const activationClick = async () => {
//     const ok = await activateHunt(state.hunt._id);
//     if (ok) {
//       const activeHunt = { ...state.hunt, isActive: true };
//       dispatch(setHunt(activeHunt));
//       return history.push("/responses");
//     } else {
//       return;
//     }
//   };

//   return (
//     <div>
//       {!state.hunt.name ? (
//         <>
//           <input
//             type="text"
//             placeholder="Hunt Name"
//             onChange={(e) => (huntName.current = e.target.value)}
//           />
//           <button onClick={buttonClick}>Create Hunt</button>{" "}
//         </>
//       ) : (
//         <>
//           <br />
//           <span>
//             HUNT NAME:{"  "}
//             <strong>
//               <em>{state.hunt.name}</em>
//             </strong>
//           </span>
//           <br />
//           {state.clues.length > 0 &&
//             state.teams.length > 0 &&
//             !state.hunt.isActive && (
//               <button onClick={activationClick}>Activate Hunt!</button>
//             )}
//         </>
//       )}
//     </div>
//   );
// };
// export default HuntsPage;
import React from "react";
import { useParams } from "react-router-dom";

export const HuntInfo = () => {
  const { id } = useParams();
  console.log(id);

  return <div>HuntInfo</div>;
};
