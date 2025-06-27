import { useCallback, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { DeleteAllCluesDialog } from "./DeleteCluesDialog/DeleteAllCluesDialog";

export const DeleteAllCluesButton = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const toggleDialogOpen = useCallback(() => {
    setDeleteDialogOpen((prev) => !prev);
  }, []);

  return (
    <>
      <Tooltip title="Delete all clues">
        <IconButton
          aria-label="delete-all-clues"
          color="error"
          onClick={toggleDialogOpen}
        >
          <DeleteForeverIcon />
        </IconButton>
      </Tooltip>
      {deleteDialogOpen && (
        <DeleteAllCluesDialog handleClose={toggleDialogOpen} />
      )}
    </>
  );
};
