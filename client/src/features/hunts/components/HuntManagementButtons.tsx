import { useCallback, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useMarkHuntCompleted } from "../hooks/useMarkHuntCompleted";
import { useDeleteHuntMutation } from "../hooks/useDeleteHuntMutation";
import { useActivateHuntMutation } from "../hooks/useActivateHuntMutation";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";
import { useClueContext } from "@lib/context/ClueContext";
import { DeleteHuntDialog } from "./DeleteHuntDialog/DeleteHuntDialog";
import { useHuntHasCluesAndTeams } from "../hooks/useHuntHasCluesAndTeams";

export const HuntManagementButtons = () => {
  const { hunt } = useHuntFragment();
  const { loading: cluesLoading } = useClueContext();
  const { huntHasCluesAndTeams } = useHuntHasCluesAndTeams();
  const [isDeleteHuntDialogOpen, setDeleteDialogOpen] = useState(false);

  const [activateHunt, { loading: activateLoading, error: activateError }] =
    useActivateHuntMutation();
  const [
    markHuntComplete,
    { loading: markCompleteLoading, error: markCompleteError },
  ] = useMarkHuntCompleted();
  const { loading: deleteLoading, error: deleteError } =
    useDeleteHuntMutation()[1];

  const toggleOpenDialog = useCallback(
    () => setDeleteDialogOpen((isOpen) => !isOpen),
    []
  );

  return (
    <>
      <Box>
        {!hunt.is_active ? (
          <>
            {!hunt.marked_complete && (
              <Button
                onClick={activateHunt}
                disabled={
                  activateLoading ||
                  deleteLoading ||
                  cluesLoading ||
                  hunt.is_active ||
                  !huntHasCluesAndTeams
                }
                startIcon={activateLoading && <CircularProgress size={20} />}
              >
                Activate hunt
              </Button>
            )}
            <Button
              variant="outlined"
              color="error"
              onClick={toggleOpenDialog}
              disabled={activateLoading || deleteLoading || hunt.is_active}
              startIcon={deleteLoading && <CircularProgress size={20} />}
            >
              Delete hunt
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={markHuntComplete}
              disabled={markCompleteLoading}
              startIcon={markCompleteLoading && <CircularProgress size={20} />}
            >
              Complete hunt
            </Button>
          </>
        )}
      </Box>
      {isDeleteHuntDialogOpen && (
        <DeleteHuntDialog handleClose={toggleOpenDialog} />
      )}
    </>
  );
};
