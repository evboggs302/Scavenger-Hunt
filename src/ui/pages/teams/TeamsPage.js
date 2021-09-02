import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setHunt } from "../../../dux/reducers/huntReducer";
import { createHunt } from "../../../utils/apiUtils.ts";

const TeamsPage = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    if (!state.hunt._id) {
      history.push("/hunt");
    }
  }, []);

  return <div>Teams PAGE</div>;
};
export default TeamsPage;
