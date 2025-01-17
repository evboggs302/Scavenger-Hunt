import React, { useCallback } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CluePayload } from "@generated/graphql";
import { useDeleteSingleClueMutation } from "../hooks/useDeleteSingleClueMutation";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";
// import CardMedia from "@mui/material/CardMedia";

type ClueCardProps = { clue: CluePayload };

/**
 * @todo Implement clue media via ClueMedia component
 */
export const ClueCard = ({
  clue: { _id, order_number, description },
}: ClueCardProps) => {
  const { hunt } = useHuntFragment();
  const [deleteClue, { loading, error }] = useDeleteSingleClueMutation();

  const handleDelete = useCallback(async () => {
    try {
      await deleteClue(_id);
    } catch {
      throw Error();
    }
  }, [_id, deleteClue]);

  return (
    <Card sx={{ maxWidth: 345, margin: "10px auto" }}>
      {/* <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      /> */}
      <CardContent>
        <Typography gutterBottom variant="subtitle1" component="div">
          <strong>{order_number}</strong>. {description}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          <i>{_id}</i>
        </Typography>
      </CardContent>
      {!hunt.is_active && (
        <CardActions>
          <Button size="small" onClick={handleDelete}>
            Delete
          </Button>
          <Button size="small" disabled>
            Edit
          </Button>
        </CardActions>
      )}
    </Card>
  );
};
