import React, { ReactNode } from "react";
import Card, { CardMetaProps } from "antd/es/card";

export interface CardContainerProps extends CardMetaProps {
  content?: ReactNode;
}

export const CardComponent = ({ title, content }: CardContainerProps) => {
  return (
    <Card title={title} bordered={false} style={{ minWidth: 300, margin: 8 }}>
      {content}
    </Card>
  );
};
