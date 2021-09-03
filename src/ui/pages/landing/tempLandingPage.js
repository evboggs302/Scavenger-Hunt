import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setHunt } from "../../../dux/reducers/huntReducer";
import { setTeams } from "../../../dux/reducers/teamsReducer";
import { setClues } from "../../../dux/reducers/cluesReducer";
import { fetchHuntData } from "../../../utils/apiUtils.ts";

// 61323e0247dc492611e225dc

const TempLandingPage = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const huntName = useRef("");
  let history = useHistory();

  const buttonClick = async () => {
    console.log(huntName.current);
    const data = await fetchHuntData(huntName.current);
    console.log(data);
    dispatch(setHunt(data[0]));
    dispatch(setTeams(data[0].teams));
    dispatch(setClues(data[0].clues));
    return history.push("/hunt");
  };

  console.log(state);
  return (
    <div>
      <h2>Welcome!</h2>
      <br />
      <p>give instructions hers</p>
      <br />
      <p>Already have an active hunt? Enter the hunt id below.</p>
      <input
        type="text"
        onChange={(e) => (huntName.current = e.target.value)}
      />
      <button onClick={buttonClick}>Go to Hunt</button>
    </div>
  );
};
export default TempLandingPage;
