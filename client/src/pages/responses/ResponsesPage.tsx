import React, { useState } from "react";
import { Avatar, List, Skeleton, Typography } from "antd";
import {
  GetResponsesByHuntDocument,
  ResponsePayload,
} from "../../generated/graphql";
import { useQuery } from "@apollo/client";
import { apolloContextHeaders } from "../../../apolloClient/apolloContextHeaders";
import { useHuntContext } from "../../lib/context/huntContext/useHuntContext";
// import { useModal } from "../../lib/hooks/useModal";
import { SmileOutlined, UserOutlined } from "@ant-design/icons";

const { Paragraph, Text } = Typography;

/**
 * @todo Add support for MMS responses
 */
export const ResponsesPage = () => {
  const headers = apolloContextHeaders();
  const { _id } = useHuntContext();
  const [responses, setResponses] = useState<ResponsePayload[]>([]);

  const { loading } = useQuery(GetResponsesByHuntDocument, {
    context: headers,
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
    pollInterval: 30000,
    variables: { id: _id || "" },
    onCompleted: ({ getHunt }) => {
      const res = getHunt?.teams?.reduce((allRes, team) => {
        if (!team?.responses) {
          return allRes;
        }
        return [...allRes, ...team.responses];
      }, [] as ResponsePayload[]);

      if (res) setResponses(res);
    },
  });

  if (loading) {
    return <Skeleton active paragraph={{ rows: 5 }} />;
  }

  return (
    <List
      size="large"
      itemLayout="horizontal"
      dataSource={responses}
      renderItem={(resp, index) => {
        const responseDate = new Date(+`${resp.time_received as string}`);
        const resposeHasBody =
          resp.response_txt && resp.response_txt?.trim().length > 0;
        return (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  // src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                  icon={index % 2 === 0 ? <UserOutlined /> : <SmileOutlined />}
                />
              }
              title={
                <>
                  <Text>{resp.team_id} </Text>
                  <Text type="secondary">
                    - {responseDate.toLocaleTimeString()}
                  </Text>
                </>
              }
              description={
                <>
                  {resp.response_txt && (
                    <Paragraph>
                      <Text strong>Body: </Text>
                      <Text italic={!!!resposeHasBody}>
                        {resposeHasBody ? resp.response_txt : "No content"}
                      </Text>
                    </Paragraph>
                  )}
                  {/* {resp.response_img && resp.response_img.length > 0 && (
                    <Button
                      onClick={() =>
                        modalInfo({
                          title: "Response Images",
                          content: resp.response_img?.map((img) => {
                            if (img) {
                              return <Image key={img} src={img} />;
                            }
                          }),
                        })
                      }>
                      See images
                    </Button>
                  )} */}
                </>
              }
            />
          </List.Item>
        );
      }}
    />
  );
};
