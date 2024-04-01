import React from "react";
import { Typography } from "antd";

const { Paragraph, Text } = Typography;

type TeamCardContentProps = {
  members?: (string | null)[] | null;
  number?: string | null;
};

export const TeamCardContent = ({ members, number }: TeamCardContentProps) => {
  return (
    <>
      <Paragraph>
        <Text strong>Contact number: </Text>
        <Text italic={!!!number}>{number || "Not provided"}</Text>
      </Paragraph>
      <Paragraph>
        <Text strong>Members: </Text>
        <Text italic={!!!members}>
          {members?.join(", ") || "None provided"}
        </Text>
      </Paragraph>
    </>
  );
};
