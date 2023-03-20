import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setHunt } from "../../../dux/reducers/huntReducer";
import { createHunt, activateHunt } from "../../../utils/apiUtils.ts";
import "./huntspage.scss";

const HuntsPage = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const huntName = useRef("");
  let history = useHistory();

  const buttonClick = async () => {
    const { data } = await createHunt(huntName.current);
    huntName.current = "";
    return dispatch(setHunt(data[0]));
  };

  const activationClick = async () => {
    const ok = await activateHunt(state.hunt._id);
    if (ok) {
      const activeHunt = { ...state.hunt, isActive: true };
      dispatch(setHunt(activeHunt));
      return history.push("/responses");
    } else {
      return;
    }
  };

  return (
    <div>
      {!state.hunt.name ? (
        <>
          <input
            type="text"
            placeholder="Hunt Name"
            onChange={(e) => (huntName.current = e.target.value)}
          />
          <button onClick={buttonClick}>Create Hunt</button>{" "}
        </>
      ) : (
        <>
          <br />
          <span>
            HUNT NAME:{"  "}
            <strong>
              <em>{state.hunt.name}</em>
            </strong>
          </span>
          <br />
          {state.clues.length > 0 &&
            state.teams.length > 0 &&
            !state.hunt.isActive && (
              <button onClick={activationClick}>Activate Hunt!</button>
            )}
        </>
      )}
    </div>
  );
};
export default HuntsPage;
