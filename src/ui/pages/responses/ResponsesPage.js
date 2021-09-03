import { useEffect } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ResponseTile from "./ResponseTile";
import { fetchResponses } from "../../../utils/apiUtils.ts";

const ResponsesPage = () => {
  const state = useSelector((state) => state);
  let history = useHistory();

  useEffect(() => {
    if (!state.hunt._id) {
      history.push("/hunt");
    }
  }, []);

  const responses = useQuery("responses", async () => {
    const data = await fetchResponses(state.hunt._id);
    console.log(data);
    return data[0].allResponses;
  });

  const markCorrect = (response_id) => {};

  console.log(responses);
  return (
    <div>
      <h3>Responses PAGE</h3>
      <br />
      {responses.isLoading && <h5>Fetching Responses...</h5>}
      <div className="responseContainer">
        {responses.status === "success" &&
          responses.data.map((resp, dex) => {
            return (
              <ResponseTile
                key={resp._id}
                response={resp}
                index={dex}
                markCorrect={markCorrect}
              />
            );
          })}
      </div>
    </div>
  );
};
export default ResponsesPage;
