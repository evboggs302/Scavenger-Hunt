import React from "react";
import { Row } from "antd";
import { useClueContext } from "../../lib/context/clueContext/useClueContext";
import { CardComponent } from "../../lib/components/Card/Card";

export const CluesPage = () => {
  const { clues } = useClueContext();

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
