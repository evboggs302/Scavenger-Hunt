import { ClueCard } from "./ClueCard";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { ClueFragment } from "@generated/graphql";
import { CardList } from "@lib/components/Cards/CardList";
import Box from "@mui/material/Box";
import { forwardRef } from "react";
import { VirtuosoGrid } from "react-virtuoso";

export const ClueCardList = ({
  canUpdateOrder,
  clueList,
}: {
  clueList: ClueFragment[];
  canUpdateOrder: boolean;
}) => {
  const { setNodeRef } = useDroppable({
    id: "droppable",
    data: {
      accepts: ["clue"],
    },
  });

  return (
    <SortableContext items={clueList.map((clu) => clu._id)}>
      <Box
        sx={{
          display: "flex",
          height: "100%",
          width: "100%",
        }}
      >
        <VirtuosoGrid
          style={{ height: "100%", width: "100%", overflow: "auto" }}
          data={clueList}
          scrollerRef={setNodeRef}
          components={{
            List: CardList,
          }}
          itemContent={(_, item) => (
            <ClueCard
              key={item._id}
              clue={item}
              canUpdateOrder={canUpdateOrder}
            />
          )}
        />
      </Box>
    </SortableContext>
  );
};
