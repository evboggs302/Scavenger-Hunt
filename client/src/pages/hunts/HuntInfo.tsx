import React from "react";
import { Divider, Skeleton, Space } from "antd";
import { useHuntContext } from "../../lib/context/huntContext/useHuntContext";
import { DetailsSection } from "./sections/DetailsSection";
import { CluesSection } from "./sections/CluesSection";
import { TeamsSection } from "./sections/TeamsSection";

export const HuntInfo = () => {
  const { loading } = useHuntContext();

  if (loading) {
    return <Skeleton active paragraph={{ rows: 5 }} />;
  }

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <DetailsSection />
      <Divider />
      <CluesSection />
      <Divider />
      <TeamsSection />
    </Space>
  );
};
