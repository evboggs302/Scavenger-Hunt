import { useNavigate } from "react-router";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { MenuContent } from "./MenuContent";
import { OptionsMenu } from "./OptionsMenu";
import { useUserContext } from "@lib/context/UserContext";
import { JourneyForgeIcon } from "@lib/components/Icons/JourneyForgeIcon";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

export const SideMenu = () => {
  const { data } = useUserContext();
  const navigate = useNavigate();
  const navigateHome = () => navigate("/app");

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "background.paper",
        },
      }}
    >
      <Box
        onClick={navigateHome}
        sx={{
          display: "flex",
          mt: "calc(var(--template-frame-height, 0px) + 4px)",
          p: 1.5,
        }}
      >
        <JourneyForgeIcon hoverEffect />
      </Box>
      <Divider />
      <MenuContent />
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: "center",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Avatar
          sizes="small"
          alt={data?.user?.first_name}
          src="/static/images/avatar/7.jpg"
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: "auto" }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, lineHeight: "16px" }}
          >
            {`${data?.user?.first_name} ${data?.user?.last_name}`}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {data?.user?.user_name}
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
    </Drawer>
  );
};
