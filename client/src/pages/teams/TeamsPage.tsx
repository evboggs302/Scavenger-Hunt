import React from "react";
import { Row } from "antd";
import { useHuntContext } from "@lib/context/huntContext/useHuntContext";
import { CardComponent } from "@lib/components/Card/Card";
import { TeamCardContent } from "./TeamCardContent";

export const TeamsPage = () => {
  const { teams } = useHuntContext();

  const teamCards = teams?.map((tm, dex) => (
    <CardComponent
      key={tm?._id}
      title={`Team ${dex + 1}`}
      content={
        <TeamCardContent members={tm.members} number={tm.device_number} />
      }
    />
  ));

  return <Row gutter={16}>{teamCards}</Row>;
};
