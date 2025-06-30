import { useCallback, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import Typography from "@mui/material/Typography";
import type { CluePayload } from "@generated/graphql";
import { useDeleteSingleClueMutation } from "../hooks/useDeleteSingleClueMutation";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";
import { EditClueDialog } from "./EditClues/EditClueDialog";
import { CSS } from "@dnd-kit/utilities";
import Box from "@mui/material/Box";
import { useSortable } from "@dnd-kit/sortable";
// import CardMedia from "@mui/material/CardMedia";

type ClueCardProps = { clue: CluePayload };

/**
 * @todo Implement clue media via ClueMedia component
 */
export const ClueCard = ({
  clue: { _id, order_number, description },
}: ClueCardProps) => {
  const { hunt } = useHuntFragment();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteClue, { loading: deleteLoading }] =
    useDeleteSingleClueMutation();

  const activeHunt = !!hunt.is_active;

  const {
    attributes,
    listeners,
    isDragging,
    isSorting,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: _id,
    disabled: activeHunt, // Disable sorting when hunt is active
    animateLayoutChanges: () => true,
    data: {
      type: "clue",
    },
  });

  const toggleDialogOpen = useCallback(
    () => setIsEditDialogOpen((val) => !val),
    []
  );

  const handleDelete = useCallback(async () => {
    try {
      await deleteClue(_id);
    } catch {
      throw Error("Unable to delete clue.");
    }
  }, [_id, deleteClue]);

  const cursor = !activeHunt ? (isDragging ? "grabbing" : "grab") : "default";

  return (
    <>
      <Card
        id={_id}
        sx={{
          width: "380px",
          margin: "8px",
          transition,
          transform: CSS.Translate.toString(transform),
          position: isDragging ? "relative" : "inherit",
          zIndex: isDragging ? 1000 : 0,
        }}
        {...attributes}
      >
        {/* <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      /> */}
        <CardContent ref={setNodeRef} sx={{ cursor }} {...listeners}>
          <Box
            sx={{
              width: "100%",
              display: hunt.is_active ? "none" : "flex",
              justifyContent: "flex-end",
            }}
          >
            <DragIndicatorIcon />
          </Box>

          <Typography gutterBottom variant="subtitle1" component="div">
            <strong>{order_number}</strong>. {description}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <i>{_id}</i>
          </Typography>
        </CardContent>
        {!activeHunt && (
          <CardActions sx={{ display: deleteLoading ? "none" : undefined }}>
            <Button
              size="small"
              onClick={handleDelete}
              disabled={deleteLoading || isSorting}
            >
              Delete
            </Button>
            <Button
              size="small"
              onClick={toggleDialogOpen}
              disabled={deleteLoading || isSorting}
            >
              Edit
            </Button>
          </CardActions>
        )}
      </Card>
      {isEditDialogOpen && (
        <EditClueDialog
          clue_id={_id}
          description={description}
          handleClose={toggleDialogOpen}
        />
      )}
    </>
  );
};
