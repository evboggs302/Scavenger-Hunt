import { useState, MouseEvent } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Cloud, ContentCopy, EditOutlined } from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { CreateCluesDialog } from "./CreateCluesDialog/CreateCluesDialog";
import { DeleteAllCluesDialog } from "./DeleteCluesDialog/DeleteAllCluesDialog";

export const ManageCluesMenu = ({
  hasItems,
  canUpdateOrder,
  setCanUpdateOrder,
}: {
  hasItems: boolean;
  canUpdateOrder: boolean;
  setCanUpdateOrder: () => void;
}) => {
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
        variant="outlined"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleTriggerClick}
      >
        Manage clues
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
        {hasItems && (
          <MenuItem
            onClick={() => {
              handleClose();
              setCanUpdateOrder();
            }}
          >
            <ListItemIcon>
              <EditOutlined fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              {canUpdateOrder ? "Cancel update order" : "Update order"}
            </ListItemText>
          </MenuItem>
        )}
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
        <CreateCluesDialog handleClose={() => setCreateDialogOpen(false)} />
      )}
      {deleteDialogOpen && (
        <DeleteAllCluesDialog handleClose={() => setDeleteDialogOpen(false)} />
      )}
    </>
  );
};
