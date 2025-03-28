import { useQuery } from "@apollo/client";
import { Navigate } from "react-router";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";
import { GetAllResponsesByHuntIdDocument } from "@generated/graphql";
import Skeleton from "@mui/material/Skeleton";
import { ResponseCard } from "../ResponseCard";
import dayjs from "dayjs";
import { NoCardsToShowText } from "@lib/components/Cards/NoCardsToShowText";
import { VirtuosoGrid } from "react-virtuoso";
import Box from "@mui/material/Box";
import { CardList } from "@lib/components/Cards/CardList";

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

  if (!data?.result.responses) {
    return <NoCardsToShowText type="responses" />;
  }

  const filteredSortedResponses = data.result.responses
    .filter((res) => !!res)
    .sort((a, b) =>
      dayjs(a.time_received).isBefore(dayjs(b.time_received)) ? 1 : 0
    );

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
      }}
    >
      <VirtuosoGrid
        style={{ height: "100%", width: "100%", overflow: "auto" }}
        data={filteredSortedResponses}
        components={{
          List: CardList,
        }}
        itemContent={(_, item) => (
          <ResponseCard key={item._id} response={item} />
        )}
      />
    </Box>
  );
};
