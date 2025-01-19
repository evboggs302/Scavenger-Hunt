import { useState, MouseEvent } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Cloud, ContentCopy } from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { CreateTeamsDialog } from "./CreateTeamsDialog/CreateTeamsDialog";
import { DeleteAllTeamsDialog } from "./DeleteTeamsDialog/DeleteAllTeamsDialog";

export const ManageTeamsMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleTriggerClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleTriggerClick}
      >
        Manage Teams
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            setCreateDialogOpen(true);
          }}
        >
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Create new</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleClose();
            setDeleteDialogOpen(true);
          }}
        >
          <ListItemIcon>
            <Cloud fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete all</ListItemText>
        </MenuItem>
      </Menu>
      {createDialogOpen && (
        <CreateTeamsDialog handleClose={() => setCreateDialogOpen(false)} />
      )}
      {deleteDialogOpen && (
        <DeleteAllTeamsDialog handleClose={() => setDeleteDialogOpen(false)} />
      )}
    </>
  );
};
