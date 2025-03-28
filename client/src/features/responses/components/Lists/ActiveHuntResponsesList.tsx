import { VirtuosoGrid } from "react-virtuoso";
import Box from "@mui/material/Box";
import { useResponsesSubscription } from "../../hooks/useResponsesSubscription";
// import CircularProgress from "@mui/material/CircularProgress";
// import DoneIcon from "@mui/icons-material/Done";
import { ResponseCard } from "../ResponseCard";
import { CardList } from "@lib/components/Cards/CardList";

export const ActiveHuntResponsesList = () => {
  const { accumulatedData, error, loading } = useResponsesSubscription();

  if (error) {
    /**
     * @todo Create ERROR MESSAGE COMPONENT
     */
    return <></>;
  }

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
        data={accumulatedData}
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
