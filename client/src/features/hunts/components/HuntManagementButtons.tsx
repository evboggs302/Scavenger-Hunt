import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useCallback, useState } from "react";
import { useMarkHuntCompleted } from "../hooks/useMarkHuntCompleted";
import { useDeleteHuntMutation } from "../hooks/useDeleteHuntMutation";
import { useActivateHuntMutation } from "../hooks/useActivateHuntMutation";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";
import { DeleteHuntDialog } from "./DeleteHuntDialog/DeleteHuntDialog";

export const HuntManagementButtons = () => {
  const { hunt } = useHuntFragment();
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
                disabled={activateLoading || deleteLoading || hunt.is_active}
                startIcon={activateLoading && <CircularProgress size={20} />}
              >
                Activate hunt
              </Button>
            )}
            <Button
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
