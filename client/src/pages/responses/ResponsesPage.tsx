import React, { useState } from "react";
import { Skeleton } from "antd";
import {
  GetResponsesByHuntDocument,
  ResponsePayload,
} from "../../generated/graphql";
import { useQuery } from "@apollo/client";
import { apolloContextHeaders } from "../../../apolloClient/apolloContextHeaders";
import { useHuntContext } from "../../lib/context/huntContext/useHuntContext";
import { CardComponent } from "../../lib/components/Card/Card";

export const ResponsesPage = () => {
  const headers = apolloContextHeaders();
  const { _id } = useHuntContext();
  const [responses, setResponses] = useState<ResponsePayload[]>([]);

  const { loading } = useQuery(GetResponsesByHuntDocument, {
    context: headers,
    fetchPolicy: "network-only",
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

  const responseCards = responses.map((res) => (
    <CardComponent
      key={res._id}
      title={res.response_txt}
      content={res.time_received}
    />
  ));

  return <div>{responseCards}</div>;
};
