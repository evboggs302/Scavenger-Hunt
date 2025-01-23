import { useCallback, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Team } from "@generated/graphql";
import { useDeleteSingleTeamMutation } from "../hooks/useDeleteSingleTeamMutation";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";
import { UpdateTeamsDialog } from "./UpdateTeamDialog/UpdateTeamDialog";

type TeamCardProps = { team: Team };

export const TeamCard = ({
  team: { _id, device_number, members, recall_sent },
}: TeamCardProps) => {
  const { hunt } = useHuntFragment();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteTeam, { loading: deleteLoading, error }] =
    useDeleteSingleTeamMutation();

  const handleDelete = useCallback(async () => {
    try {
      await deleteTeam(_id);
    } catch {
      throw Error(error?.stack);
    }
  }, [_id, deleteTeam, error?.stack]);

  return (
    <>
      <Card sx={{ width: "320px", margin: "8px" }}>
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
        <UpdateTeamsDialog
          team_id={_id}
          team={{ device_number, members }}
          handleClose={() => setIsEditDialogOpen(false)}
        />
      )}
    </>
  );
};
