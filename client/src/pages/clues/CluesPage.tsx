// import { useState, useRef, useEffect, Fragment } from "react";
// import { useAppSelector, useAppDispatch } from "src/dux/stateHooks";
// import { useHistory } from "react-router-dom";
// import { setClues } from "../../../dux/reducers/cluesReducer";
// import { createClues } from "../../../utils/apiUtils";

// const CluesPage = () => {
//   const state = useAppSelector((state) => state);
//   const [cluesExist, setCluesExist] = useState(false);
//   const [cluesLength, setLength] = useState(0);
//   const [clues, setTempClues] = useState([]);
//   const draft = useRef(null);
//   const dispatch = useAppDispatch();
//   let history = useHistory();

//   useEffect(() => {
//     if (!state.hunt._id) {
//       history.push("/");
//     }
//     if (state.clues.length > 0) {
//       setCluesExist(true);
//     }
//     draft.current = [];
//   }, []);

//   useEffect(() => {
//     let tempClues = [];
//     for (let i = 0; i < cluesLength; i++) {
//       tempClues.push("");
//     }
//     setTempClues(tempClues);
//   }, [cluesLength]);

//   const mappedClueTemplates = clues.map((el, dex) => {
//     return (
//       <Fragment key={dex + 1}>
//         <textarea
//           name="clueText"
//           id={dex}
//           cols="30"
//           rows="10"
//           onChange={(e) => (draft.current[dex] = e.target.value)}></textarea>
//         <br />
//       </Fragment>
//     );
//   });

//   const mappedClues = state.clues.map((el) => {
//     return <li key={el._id}>{el.description}</li>;
//   });

//   const saveClues = async () => {
//     const { data } = await createClues(state.hunt._id, draft.current);
//     dispatch(setClues(data));
//     setCluesExist(true);
//     return;
//   };

//   return (
//     <div>
//       {!cluesExist ? (
//         <>
//           <section>Create your clues below.</section>
//           <br />
//           <span>
//             <div>How many clues?</div>
//             <input type="number" onChange={(e) => setLength(+e.target.value)} />
//           </span>
//         </>
//       ) : null}
//       <br />
//       {!cluesExist ? (
//         <span>{mappedClueTemplates}</span>
//       ) : (
//         <ol>{mappedClues}</ol>
//       )}
//       {!cluesExist && <button onClick={saveClues}>Save Clues</button>}
//     </div>
//   );
// };
// export default CluesPage;
