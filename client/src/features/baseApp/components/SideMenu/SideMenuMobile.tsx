import React, { useCallback } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { MenuContent } from "./MenuContent";
import { useLogoutMutation } from "@features/baseApp/hooks/useLogoutMutation";
import { useUserContext } from "@lib/context/UserContext";
import { CreateHuntButton } from "@features/createHuntDialog/components/CreateHuntButton";

interface SideMenuMobileProps {
  open: boolean | undefined;
  toggleDrawer: (newOpen: boolean) => () => void;
}

export const SideMenuMobile = ({ open, toggleDrawer }: SideMenuMobileProps) => {
  const { data } = useUserContext();
  const [logoutUser] = useLogoutMutation();

  const handleLogout = useCallback(async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.log(err);
    }
  }, [logoutUser]);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: "none",
          backgroundColor: "background.paper",
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: "70dvw",
          height: "100%",
        }}
      >
        <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
          <Stack
            direction="row"
            sx={{ gap: 1, alignItems: "center", flexGrow: 1, p: 1 }}
          >
            <Avatar
              sizes="small"
              alt={data?.user.first_name}
              src="/static/images/avatar/7.jpg"
              sx={{ width: 24, height: 24 }}
            />
            <Typography component="p" variant="h6">
              {`${data?.user?.first_name} ${data?.user?.last_name}`}
            </Typography>
          </Stack>
          <CreateHuntButton variant="small" />
        </Stack>
        <Divider />
        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent />
          <Divider />
        </Stack>
        <Stack sx={{ p: 2 }}>
          <Button
            variant="outlined"
            onClick={handleLogout}
            fullWidth
            startIcon={<LogoutRoundedIcon />}
          >
            Logout
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
};
