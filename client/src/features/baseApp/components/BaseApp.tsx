import { Outlet } from "react-router";
import { AppNavbar } from "@features/baseApp/components/AppNavbar";
import { UserQryContextProvider } from "@lib/context/UserContext";
import { HuntQryContextProvider } from "@lib/context/HuntContext";
import Box from "@mui/material/Box";
import { SideMenu } from "./SideMenu/SideMenu";
import Stack from "@mui/material/Stack";
import { Header } from "./Header";
import { ClueQryContextProvider } from "@lib/context/ClueContext";

export const BaseApp = () => {
  return (
    <UserQryContextProvider>
      <HuntQryContextProvider>
        <ClueQryContextProvider>
          <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
            <SideMenu />
            <AppNavbar />
            {/* Main content */}
            <Box
              component="main"
              sx={{ display: "flex", width: "100%", height: "100%" }}
            >
              <Stack
                spacing={2}
                sx={{
                  alignItems: "center",
                  mx: 3,
                  pb: 5,
                  mt: { xs: 8, md: 0 },
                }}
              >
                <Header />
                <Outlet />
              </Stack>
            </Box>
          </Box>
        </ClueQryContextProvider>
      </HuntQryContextProvider>
    </UserQryContextProvider>
  );
};
