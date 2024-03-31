import React from "react";
import { Collapse } from "antd";

export const CluesSection = () => {
  return (
    <Collapse
      collapsible="header"
      items={[
        {
          key: "CluesSection",
          label: "Clues",
          children: <></>,
        },
      ]}
    />
  );
};
