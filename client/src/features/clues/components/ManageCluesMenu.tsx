import { useState, MouseEvent } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { EditOutlined } from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

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
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
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
      </Menu>
    </>
  );
};
