import { useCallback, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import Typography from "@mui/material/Typography";
import { CluePayload } from "@generated/graphql";
import { useDeleteSingleClueMutation } from "../hooks/useDeleteSingleClueMutation";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";
import { EditClueDialog } from "./EditClues/EditClueDialog";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import Box from "@mui/material/Box";
import { useSortable } from "@dnd-kit/sortable";
// import CardMedia from "@mui/material/CardMedia";

type ClueCardProps = { clue: CluePayload; canUpdateOrder: boolean };

/**
 * @todo Implement clue media via ClueMedia component
 */
export const ClueCard = ({
  clue: { _id, order_number, description },
  canUpdateOrder,
}: ClueCardProps) => {
  const { hunt } = useHuntFragment();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteClue, { loading: deleteLoading }] =
    useDeleteSingleClueMutation();

  // const { attributes, listeners, setNodeRef, transform } = useDraggable({
  //   id: _id,
  //   data: { type: "clue", id: _id },
  //   disabled: !hunt.is_active && !canUpdateOrder,
  // });

  const {
    attributes,
    listeners,
    index,
    isDragging,
    isSorting,
    over,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: _id,
    disabled: hunt.is_active || !canUpdateOrder,
    animateLayoutChanges: () => true,
  });

  const handleDelete = useCallback(async () => {
    try {
      await deleteClue(_id);
    } catch {
      throw Error();
    }
  }, [_id, deleteClue]);

  const cursor = isDragging ? "grabbing" : canUpdateOrder ? "grab" : "default";

  return (
    <>
      <Card
        ref={setNodeRef}
        id={_id}
        sx={{
          width: "380px",
          margin: "8px",
          transition,
          transform: CSS.Translate.toString(transform),
          cursor,
        }}
        {...listeners}
        {...attributes}
      >
        {/* <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      /> */}
        <CardContent>
          {canUpdateOrder && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <DragIndicatorIcon />
            </Box>
          )}
          <Typography gutterBottom variant="subtitle1" component="div">
            <strong>{order_number}</strong>. {description}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <i>{_id}</i>
          </Typography>
        </CardContent>
        {!hunt.is_active && !canUpdateOrder && (
          <CardActions sx={{ display: deleteLoading ? "none" : undefined }}>
            <Button size="small" onClick={handleDelete}>
              Delete
            </Button>
            <Button size="small" onClick={() => setIsEditDialogOpen(true)}>
              Edit
            </Button>
          </CardActions>
        )}
      </Card>
      {isEditDialogOpen && (
        <EditClueDialog
          clue_id={_id}
          description={description}
          handleClose={() => setIsEditDialogOpen(false)}
        />
      )}
    </>
  );
};
