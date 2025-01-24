import { CardListContainer } from "@lib/components/Cards/CardListContainer";
import { ClueCard } from "./ClueCard";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { ClueFragment } from "@generated/graphql";

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

  const clueCards = clueList.map((clu) => (
    <ClueCard key={clu._id} clue={clu} canUpdateOrder={canUpdateOrder} />
  ));

  return (
    <SortableContext items={clueList.map((clu) => clu._id)}>
      <CardListContainer ref={setNodeRef}>{clueCards}</CardListContainer>
    </SortableContext>
  );
};
