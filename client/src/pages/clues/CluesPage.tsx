import React from "react";
import { useClueContext } from "@lib/context/ClueContext";
import { CardComponent } from "@lib/components/Card/Card";
import { Row } from "antd";

export const CluesPage = () => {
  const { data } = useClueContext();
  const clues = data?.getCluesByHuntId

  const clueCards = clues?.map((cl) => (
    <CardComponent
      key={cl?._id}
      title={`#${cl?.order_number}`}
      content={cl?.description}
    />
  ));

  return (
    <Row gutter={16} style={{ overflowY: "auto" }}>
      {clueCards}
    </Row>
  );
};
