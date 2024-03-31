import React from "react";
import { Skeleton } from "antd";
import { useHuntContext } from "../../lib/context/huntContext/useHuntContext";

export const TeamsPage = () => {
  const { teams, loading } = useHuntContext();

  if (loading) {
    return <Skeleton active paragraph={{ rows: 5 }} />;
  }

  const teamCards = teams?.map((tm) => <div>{tm.device_number}</div>);

  return <div>{teamCards}</div>;
};
