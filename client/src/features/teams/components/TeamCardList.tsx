import { TeamCard } from "./TeamCard";
import { useHuntContext } from "@lib/context/HuntContext";
import { NoCardsToShowText } from "@lib/components/Cards/NoCardsToShowText";
import Box from "@mui/material/Box";
import { VirtuosoGrid } from "react-virtuoso";
import { CardList } from "@lib/components/Cards/CardList";

export const TeamCardList = () => {
  const { data } = useHuntContext();
  const teams = data?.hunt?.teams;

  const filteredTeams = teams?.filter((tm) => tm !== null);

  if (filteredTeams && filteredTeams.length === 0) {
    return <NoCardsToShowText type="teams" />;
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
        data={filteredTeams}
        components={{
          List: CardList,
        }}
        itemContent={(_, item) => <TeamCard key={item?._id} team={item} />}
      />
    </Box>
  );
};
