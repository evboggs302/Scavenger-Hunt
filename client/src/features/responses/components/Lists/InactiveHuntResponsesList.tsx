import React from "react";
import { useQuery } from "@apollo/client";
import { Navigate } from "react-router";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";
import { GetAllResponsesByHuntIdDocument } from "@generated/graphql";
import Skeleton from "@mui/material/Skeleton";
import { ResponseCard } from "../ResponseCard";
import dayjs from "dayjs";

export const InactiveHuntResponsesList = () => {
  const { hunt } = useHuntFragment();
  const { data, loading } = useQuery(GetAllResponsesByHuntIdDocument, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
    variables: { id: hunt?._id || "" },
  });

  const shouldNavAway = !hunt.is_active && !data?.result.responses;

  if (shouldNavAway) {
    return <Navigate to="" replace />;
  }

  if (loading) {
    return <Skeleton variant="rectangular" width={210} height={60} />;
  }

  return (
    <div>
      {data?.result.responses
        ?.filter((res) => !!res)
        .sort((a, b) =>
          dayjs(a.time_received).isBefore(dayjs(b.time_received)) ? 1 : 0
        )
        .map((res) => <ResponseCard response={res} />)}
    </div>
  );
};
