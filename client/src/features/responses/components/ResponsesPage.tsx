import React, { useState } from "react";
import {
  GetAllResponsesByHuntIdDocument,
  GetResponsesByHuntIdDocument,
  ResponsePayload,
} from "@generated/graphql";
import { useQuery } from "@apollo/client";
import { useHuntFragment } from "../../../lib/hooks/useHuntFragment";
import Skeleton from "@mui/material/Skeleton";
import { useResponsesSubscription } from "../hooks/useResponsesSubscription";
import { Navigate, useNavigate } from "react-router";

/**
 * @todo Add support for MMS responses
 */
export const ResponsesPage = () => {
  const { hunt } = useHuntFragment();

  const {
    accumulatedData,
    error,
    loading: subscriptionLoading,
  } = useResponsesSubscription();
  console.log("accumulatedData: ", accumulatedData);

  // const { data, loading } = useQuery(GetAllResponsesByHuntIdDocument, {
  //   fetchPolicy: "network-only",
  //   nextFetchPolicy: "cache-and-network",
  //   pollInterval: 30_000,
  //   variables: { id: hunt?._id || "" },
  // });

  // const shouldNavAway = !hunt.is_active && !data?.result.responses;

  // if (shouldNavAway) {
  //   return <Navigate to="" replace />;
  // }

  // if (loading) {
  //   return <Skeleton variant="rectangular" width={210} height={60} />;
  // }

  return (
    <></>
    // <List
    //   size="large"
    //   itemLayout="horizontal"
    //   dataSource={responses}
    //   renderItem={(resp, index) => {
    //     const responseDate = new Date(+`${resp.time_received as string}`);
    //     const resposeHasBody =
    //       resp.response_txt && resp.response_txt?.trim().length > 0;
    //     return (
    //       <List.Item>
    //         <List.Item.Meta
    //           avatar={
    //             <Avatar
    //               // src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
    //               icon={index % 2 === 0 ? <UserOutlined /> : <SmileOutlined />}
    //             />
    //           }
    //           title={
    //             <>
    //               <Text>{resp.team_id} </Text>
    //               <Text type="secondary">
    //                 - {responseDate.toLocaleTimeString()}
    //               </Text>
    //             </>
    //           }
    //           description={
    //             <>
    //               {resp.response_txt && (
    //                 <Paragraph>
    //                   <Text strong>Body: </Text>
    //                   <Text italic={!!!resposeHasBody}>
    //                     {resposeHasBody ? resp.response_txt : "No content"}
    //                   </Text>
    //                 </Paragraph>
    //               )}
    //               {/* {resp.response_img && resp.response_img.length > 0 && (
    //                 <Image key={img} src={img} />
    //               )} */}
    //             </>
    //           }
    //         />
    //       </List.Item>
    //     );
    //   }}
    // />
  );
};
