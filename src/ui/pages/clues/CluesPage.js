import { useState, useRef, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setClues } from "../../../dux/reducers/cluesReducer";
import { createClues } from "../../../utils/apiUtils.ts";

const CluesPage = () => {
  const state = useSelector((state) => state);
  const [cluesLength, setLength] = useState(0);
  const [clues, setTempClues] = useState([]);
  const draft = useRef(null);
  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    if (!state.hunt._id) {
      history.push("/hunt");
    }
    draft.current = [];
  }, []);

  useEffect(() => {
    let tempClues = [];
    for (let i = 0; i < cluesLength; i++) {
      tempClues.push("");
    }
    setTempClues(tempClues);
  }, [cluesLength]);

  const mappedClueTemplates = clues.map((el, dex) => {
    return (
      <Fragment key={dex + 1}>
        <textarea
          name="clueText"
          id={dex}
          cols="30"
          rows="10"
          onChange={(e) => (draft.current[dex] = e.target.value)}></textarea>
        <br />
      </Fragment>
    );
  });

  const saveClues = async () => {
    const { data } = await createClues(state.hunt._id, draft.current);
    return dispatch(setClues(data));
  };

  return (
    <div>
      <section>Create your clues below.</section>
      <br />
      <span>
        <div>How many clues?</div>
        <input type="number" onChange={(e) => setLength(+e.target.value)} />
      </span>
      <br />
      <span>{mappedClueTemplates}</span>
      <button onClick={saveClues}>Save Clues</button>
    </div>
  );
};
export default CluesPage;
