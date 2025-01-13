import React, { useCallback, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ExtensionRoundedIcon from "@mui/icons-material/ExtensionRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { useLocation, useNavigate, useParams } from "react-router";
import { GetHuntsByUserIdDocument } from "@generated/graphql";
import { useQuery } from "@apollo/client";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Collapse from "@mui/material/Collapse";

const secondaryListItems = [
  { text: "Settings", icon: <SettingsRoundedIcon /> },
];

export const MenuContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { huntId } = useParams();
  const [isHuntsOpen, setHuntsOpen] = useState(true);

  const navigateHome = () => navigate("/dashboard");
  const handleHuntsClick = useCallback(
    () => setHuntsOpen(!isHuntsOpen),
    [isHuntsOpen, setHuntsOpen]
  );

  const { data, loading } = useQuery(GetHuntsByUserIdDocument, {
    fetchPolicy: "cache-and-network",
    pollInterval: 30000,
  });

  const mappedHunts = data?.hunts?.map((hunt) => {
    if (!hunt) return null;

    return (
      <ListItem key={hunt._id} disablePadding sx={{ pl: 3 }}>
        <ListItemButton
          selected={huntId === hunt._id}
          onClick={() => {
            navigate(`hunt/${hunt._id}`, { relative: "path" });
          }}
        >
          <ListItemText primary={hunt.name} />
        </ListItemButton>
      </ListItem>
    );
  });

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            selected={location.pathname === "default"}
            onClick={navigateHome}
          >
            <ListItemIcon>{<HomeRoundedIcon />}</ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton onClick={handleHuntsClick}>
            <ListItemIcon>{<ExtensionRoundedIcon />}</ListItemIcon>
            <ListItemText primary="Your hunts" />
            {isHuntsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={isHuntsOpen} timeout="auto" unmountOnExit>
            {mappedHunts}
          </Collapse>
        </ListItem>
      </List>

      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};
