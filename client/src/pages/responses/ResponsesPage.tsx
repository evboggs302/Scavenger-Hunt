import React from "react";
import { Skeleton } from "antd";
import { useHuntContext } from "../../lib/context/huntContext/useHuntContext";

export const HuntInfo = () => {
  const { clues, loading } = useHuntContext();

  if (loading) {
    return <Skeleton active paragraph={{ rows: 5 }} />;
  }

  const clueCards = clues?.map((clue) => <div>{clue.description}</div>);

  return <div>{clueCards}</div>;
};
