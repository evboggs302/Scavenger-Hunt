import { useEffect, useState } from "react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { ClueCardList } from "@features/clues/components/ClueCardList";
import { useClueContext } from "@lib/context/ClueContext";
import { useUpdateClueOrderMutation } from "@features/clues/hooks/useUpdateClueOrderMutation";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { dragMeasuring } from "./utils/dragMeasuring";
import type { CluePayload } from "@generated/graphql";
import { CircularLoading } from "@lib/components/Loading/CircularLoading";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { CreateCluesButton } from "@features/clues/components/CreateCluesButton";
import { DeleteAllCluesButton } from "@features/clues/components/DeleteAllCluesButton";

const EmptyCluesTablePlaceholder = () => {
  return (
    <Box
      data-testid="empty-clues-table-placeholder"
      style={{ width: "100%", textAlign: "center", padding: "20px" }}
    >
      No data to display.
    </Box>
  );
};

export const CluesPage = () => {
  const { data, loading } = useClueContext();
  const [items, setItems] = useState<CluePayload[]>([]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [updateOrder] = useUpdateClueOrderMutation();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const activeIndex =
    activeId != null ? items.findIndex((clu) => clu?._id === activeId) : -1;

  const handleOnDragStart = ({ active }: DragStartEvent) =>
    setActiveId(active.id);

  const handleOnDragCancel = () => setActiveId(null);

  const handleOnDragEnd = async ({ over }: DragEndEvent) => {
    if (over) {
      const newIndex = items.findIndex((clu) => clu._id === over.id);

      if (activeIndex !== newIndex) {
        let newOrder: CluePayload[] = [];
        setItems((itms) => {
          newOrder = arrayMove(itms, activeIndex, newIndex).map(
            (clu, index) => ({
              ...clu,
              order_number: index + 1,
            })
          );

          return newOrder;
        });

        await updateOrder(newOrder);
      }
    }

    setActiveId(null);
  };

  useEffect(() => {
    if (data?.clues) {
      setItems(data.clues.filter((clu) => !!clu));
    }
  }, [data?.clues]);

  if (loading) {
    return <CircularLoading />;
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <CreateCluesButton />
        <DeleteAllCluesButton />
      </Box>
      <Divider sx={{ margin: "10px auto" }} />
      {data?.clues.length === 0 && <EmptyCluesTablePlaceholder />}
      {items.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          measuring={dragMeasuring}
          modifiers={[restrictToWindowEdges]}
          onDragStart={handleOnDragStart}
          onDragCancel={handleOnDragCancel}
          onDragEnd={handleOnDragEnd}
        >
          <ClueCardList clueList={items} />
        </DndContext>
      )}
    </>
  );
};
