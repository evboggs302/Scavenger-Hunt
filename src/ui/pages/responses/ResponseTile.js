import { useState } from "react";

const ResponseTile = ({ response, idex, markCorrect }) => {
  console.log(response);
  return (
    <section>
      {response.response_img ? (
        response.response_img.map((img) => {
          return <img src={img} alt="response img" />;
        })
      ) : (
        <p>{response.response_txt}</p>
      )}
      {response.time_received}
    </section>
  );
};
export default ResponseTile;
