import { useQuery } from "react-query";
import { fetchResponses } from "../../../utils/apiUtils";

const ResponsesPage = ({ hunt_id }) => {
  const responses = useQuery("responses", () => {
    const { data } = fetchResponses(hunt_id);
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
