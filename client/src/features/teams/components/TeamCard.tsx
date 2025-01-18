import { useCallback } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Team } from "@generated/graphql";
import { useDeleteSingleTeamMutation } from "../hooks/useDeleteSingleTeamMutation";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";

type TeamCardProps = { team: Team };

export const TeamCard = ({
  team: { _id, device_number, members, recall_sent },
}: TeamCardProps) => {
  const { hunt } = useHuntFragment();
  const [deleteTeam, { loading, error }] = useDeleteSingleTeamMutation();

  const handleDelete = useCallback(async () => {
    try {
      await deleteTeam(_id);
    } catch {
      throw Error(error?.stack);
    }
  }, [_id, deleteTeam, error?.stack]);

  return (
    <Card sx={{ maxWidth: 345, margin: "10px auto" }}>
      {/* <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      /> */}
      <CardContent>
        <Typography gutterBottom variant="subtitle2" component="div">
          {device_number}
        </Typography>
        <Typography
          gutterBottom
          variant="body1"
          sx={{ color: "text.secondary" }}
        >
          {members.join(", ")}
        </Typography>
        <Typography gutterBottom variant="body2">
          Recall sent: <i>{`${recall_sent ? "TRUE" : "FALSE"}`}</i>
        </Typography>
        <Typography gutterBottom variant="body2">
          ID: <i>{_id}</i>
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
