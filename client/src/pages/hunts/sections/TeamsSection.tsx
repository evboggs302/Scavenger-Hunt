import React from "react";
import { Collapse } from "antd";

export const TeamsSection = () => {
  return (
    <Collapse
      collapsible="header"
      items={[
        {
          key: "TeamsSection",
          label: "Teams",
          children: <></>,
        },
      ]}
    />
  );
};
