import React from "react";
import { Row } from "antd";
import { useHuntContext } from "../../lib/context/huntContext/useHuntContext";
import { CardComponent } from "../../lib/components/Card/Card";

export const TeamsPage = () => {
  const { teams } = useHuntContext();

  const teamCards = teams?.map((tm) => (
    <CardComponent
      key={tm?._id}
      title={tm?.device_number}
      content={tm?.members}
    />
  ));

  return <Row gutter={16}>{teamCards}</Row>;
};
