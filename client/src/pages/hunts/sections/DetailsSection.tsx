import React from "react";
import { Collapse, Descriptions, DescriptionsProps } from "antd";
import { useHuntContext } from "../../../lib/context/huntContext/useHuntContext";
import { formatDateString } from "../../../lib/utils/formatDateString";
import { HuntStatus } from "../../../lib/components/Badge/HuntStatus";

export const DetailsSection = () => {
  const {
    _id,
    name,
    created_date,
    start_date,
    end_date,
    is_active,
    recall_message,
  } = useHuntContext();

  if (created_date) console.log(formatDateString(created_date));

  const items: DescriptionsProps["items"] = [
    {
      key: "id",
      label: "Hunt ID",
      children: _id,
    },
    {
      key: "is_active",
      label: "Status",
      children: <HuntStatus isActive={!!is_active} />,
    },
    {
      key: "created_date",
      label: "Created date",
      //   children: created_date ? created_date : "Unspecified",
      children: created_date ? formatDateString(created_date) : "Unspecified",
    },
    {
      key: "start_date",
      label: "Start date",
      children: start_date ? formatDateString(start_date) : "Unspecified",
    },
    {
      key: "end_date",
      label: "End date",
      children: end_date ? formatDateString(end_date) : "Unspecified",
    },
    {
      key: "recall_message",
      label: "Recall message",
      children: recall_message,
    },
  ];

  return (
    <Collapse
      collapsible="header"
      defaultActiveKey={["DetailsSection"]}
      items={[
        {
          key: "DetailsSection",
          label: "Details",
          children: <Descriptions title={name} items={items} />,
        },
      ]}
    />
  );
};
