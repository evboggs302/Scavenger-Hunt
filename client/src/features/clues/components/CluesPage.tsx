import { useCallback, useEffect, useState } from "react";
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
import { ClueCardList } from "./ClueCardList";
import { ManageCluesMenu } from "./ManageCluesMenu";
import { ManagementButtonsContainer } from "@lib/components/ManagementButtons/ManagementButtonsContainer";
import { useClueContext } from "@lib/context/ClueContext";
import { useUpdateClueOrderMutation } from "../hooks/useUpdateClueOrderMutation";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { NoCardsToShowText } from "@lib/components/Cards/NoCardsToShowText";
import { dragMeasuring } from "../utils/dragMeasuring";
import { CluePayload } from "@generated/graphql";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

export const CluesPage = () => {
  const { data } = useClueContext();
  const [items, setItems] = useState<CluePayload[]>([]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [canUpdateOrder, setCanUpdateOrder] = useState(false);
  const [updateOrder, { loading }] = useUpdateClueOrderMutation();

  useEffect(() => {
    if (data?.clues) {
      setItems(data.clues.filter((clu) => !!clu));
    }
  }, [data]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleCanUpdateOrder = useCallback(
    () => setCanUpdateOrder((val) => !val),
    []
  );

  const activeIndex =
    activeId != null ? items.findIndex((clu) => clu?._id === activeId) : -1;

  const handleOnDragStart = ({ active }: DragStartEvent) =>
    setActiveId(active.id);

  const handleOnDragCancel = () => setActiveId(null);

  const handleOnDragEnd = async ({ over }: DragEndEvent) => {
    if (over) {
      const overIndex = items.findIndex((clu) => clu._id === over.id);

      if (activeIndex !== overIndex) {
        const newIndex = overIndex;

        setItems((itms) =>
          arrayMove(itms, activeIndex, newIndex).map((clu, index) => ({
            ...clu,
            order_number: index + 1,
          }))
        );

        await updateOrder(items);
      }
    }

    setActiveId(null);
  };

  return (
    <>
      <ManagementButtonsContainer>
        {canUpdateOrder && (
          <Button
            color="warning"
            variant="outlined"
            onClick={handleCanUpdateOrder}
            startIcon={loading && <CircularProgress size={20} />}
          >
            Exit
          </Button>
        )}
        {!canUpdateOrder && (
          <ManageCluesMenu
            hasItems={items.length > 0}
            canUpdateOrder={canUpdateOrder}
            setCanUpdateOrder={handleCanUpdateOrder}
          />
        )}
      </ManagementButtonsContainer>
      {data?.clues.length === 0 && <NoCardsToShowText type="clues" />}
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
          <ClueCardList clueList={items} canUpdateOrder={canUpdateOrder} />
        </DndContext>
      )}
    </>
  );
};
