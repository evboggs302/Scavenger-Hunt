import React, { useCallback, useState } from "react";
import { Button } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import DoneIcon from "@mui/icons-material/Done";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";
import { Team } from "@generated/graphql";
import { useDeleteSingleTeamMutation } from "@features/teams/hooks/useDeleteSingleTeamMutation";
import { UpdateTeamsDialog } from "../UpdateTeamDialog/UpdateTeamDialog";

type TeamsTableRowProps = {
  team: Team;
};

export const TeamsTableRow = ({
  team: { _id, members, device_number, recall_sent },
}: TeamsTableRowProps) => {
  const { hunt } = useHuntFragment();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteTeam, { error }] = useDeleteSingleTeamMutation();

  const handleDelete = useCallback(async () => {
    try {
      await deleteTeam(_id);
    } catch {
      throw Error(error?.stack);
    }
  }, [_id, deleteTeam, error?.stack]);

  return (
    <>
      <TableCell sx={{ maxWidth: 220 }}>{members.join(", ")}</TableCell>
      <TableCell>{device_number}</TableCell>
      <TableCell>
        {recall_sent ? <DoneIcon color="success" /> : "---"}
      </TableCell>
      <TableCell>
        {!hunt.is_active && (
          <>
            <Button size="small" onClick={handleDelete}>
              Delete
            </Button>
            <Button size="small" onClick={() => setIsEditDialogOpen(true)}>
              Edit
            </Button>
          </>
        )}
      </TableCell>
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
