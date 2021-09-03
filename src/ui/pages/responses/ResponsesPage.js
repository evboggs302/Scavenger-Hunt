import { useEffect } from "react";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchResponses } from "../../../utils/apiUtils.ts";
// import { setHunt } from "../../../dux/reducers/huntReducer";
// import { createHunt } from "../../../utils/apiUtils.ts";

const ResponsesPage = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    if (!state.hunt._id) {
      history.push("/hunt");
    }
  }, []);

  const responses = useQuery("responses", async () => {
    const { data } = await fetchResponses(state.hunt._id);
    return data[0].allResponses;
  });

  return (
    <div>
      <h3>Responses PAGE</h3>
      <br />
      {responses.length > 0 &&
        responses.map((resp, index) => {
          return (
            <section>
              {resp.response_img ? (
                <img src={resp.response_img} alt={resp.response_img} />
              ) : (
                <div>{resp.response_txt}</div>
              )}
              {resp.time_received}
            </section>
          );
        })}
    </div>
  );
};
export default ResponsesPage;
