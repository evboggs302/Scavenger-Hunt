import { useCallback, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";
import { CreateCluesDialog } from "./CreateCluesDialog/CreateCluesDialog";

export const CreateCluesButton = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const toggleDialogOpen = useCallback(() => {
    setCreateDialogOpen((prev) => !prev);
  }, []);

  return (
    <>
      <Tooltip title="Create new clue">
        <IconButton
          aria-label="create-clues"
          onClick={toggleDialogOpen}
          sx={{ marginRight: "6px" }}
        >
          <PlaylistAddCircleIcon />
        </IconButton>
      </Tooltip>
      {createDialogOpen && <CreateCluesDialog handleClose={toggleDialogOpen} />}
    </>
  );
};
