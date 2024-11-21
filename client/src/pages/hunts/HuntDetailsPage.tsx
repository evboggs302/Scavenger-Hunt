import React from "react";
import { useHuntContext } from "@lib/context/HuntContext";
import { formatDateString } from "@lib/utils/formatDateString";
// import { HuntStatus } from "@lib/components/Badge/HuntStatus";

export const HuntDetailsPage = () => {
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

  return (
    <></>
    // <Descriptions
    //   style={{
    //     backgroundColor: "white",
    //     padding: 12,
    //     borderRadius: 8,
    //   }}
    //   title={name}
    //   items={items}
    // />
  );
};
