import React from "react";
import Stack from "@mui/material/Stack";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { NavbarBreadcrumbs } from "./NavbarBreadcrumbs";
import { MenuButton } from "./MenuButton";
import { CreateHuntButton } from "@features/createHuntDialog/components/CreateHuntButton";

export const Header = () => {
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: "none", md: "flex" },
        width: "100%",
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between",
        maxWidth: { sm: "100%", md: "1700px" },
        pt: 1.5,
      }}
      spacing={2}>
      <NavbarBreadcrumbs />
      <CreateHuntButton />
      <MenuButton showBadge aria-label="Open notifications">
        <NotificationsRoundedIcon />
      </MenuButton>
    </Stack>
  );
};
