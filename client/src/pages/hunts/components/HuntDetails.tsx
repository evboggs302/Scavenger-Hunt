import React from "react";
import { useHuntContext } from "@lib/context/HuntContext";

export const HuntDetails = () => {
  const { data } = useHuntContext();

  if (!data?.hunt) {
    return null;
  }

  const {
    _id,
    name,
    created_date,
    start_date,
    end_date,
    is_active,
    recall_message,
  } = data.hunt;

  return <></>;
};
