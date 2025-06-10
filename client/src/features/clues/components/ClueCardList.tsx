import { ClueCard } from "./ClueCard";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import type { ClueFragment } from "@generated/graphql";
import { CardList } from "@lib/components/Cards/CardList";
import Box from "@mui/material/Box";
import { VirtuosoGrid } from "react-virtuoso";

export const ClueCardList = ({ clueList }: { clueList: ClueFragment[] }) => {
  const { setNodeRef } = useDroppable({
    id: "droppable-clue-container",
    data: {
      accepts: ["clue"],
    },
  });

  const clueItems = clueList.map((clue) => clue._id);

  return (
    <SortableContext items={clueItems}>
      <Box
        ref={setNodeRef}
        sx={{
          display: "flex",
          height: "100%",
          width: "100%",
        }}
      >
        <VirtuosoGrid
          style={{ height: "100%", width: "100%", overflow: "auto" }}
          data={clueList}
          components={{
            List: CardList,
          }}
          itemContent={(_, item) => <ClueCard key={item._id} clue={item} />}
        />
      </Box>
    </SortableContext>
  );
};
