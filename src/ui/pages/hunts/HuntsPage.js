import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setHunt } from "../../../dux/reducers/huntReducer";
import { createHunt } from "../../../utils/apiUtils.ts";
import "./huntspage.scss";

const HuntsPage = () => {
  const hunt = useSelector((state) => state.hunt);
  const dispatch = useDispatch();
  // const [showName, setBool] = useState(false);
  const huntName = useRef("");

  const buttonClick = async () => {
    const { data } = await createHunt(huntName.current);
    huntName.current = "";
    return dispatch(setHunt(data[0]));
  };
  console.log(hunt);
  return (
    <div>
      {!hunt.name ? (
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
          <paragraph>
            HUNT NAME:{"  "}
            <strong>
              <em>{hunt.name}</em>
            </strong>
          </paragraph>
        </>
      )}
    </div>
  );
};
export default HuntsPage;
