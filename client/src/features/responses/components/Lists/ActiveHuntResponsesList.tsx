import React from "react";
import { useResponsesSubscription } from "../../hooks/useResponsesSubscription";
// import CircularProgress from "@mui/material/CircularProgress";
// import DoneIcon from "@mui/icons-material/Done";
import { ResponseCard } from "../ResponseCard";

export const ActiveHuntResponsesList = () => {
  const { accumulatedData, error, loading } = useResponsesSubscription();

  if (error) {
    /**
     * @todo Create ERROR MESSAGE COMPONENT
     */
    return <></>;
  }

  return (
    <div>
      {/* {loading ? <CircularProgress /> : <DoneIcon color="success" />} */}
      {accumulatedData.map((res) => (
        <ResponseCard key={res._id} response={res} />
      ))}
    </div>
  );
};
