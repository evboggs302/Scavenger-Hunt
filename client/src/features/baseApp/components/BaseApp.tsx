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
          <Box
            sx={{
              display: "flex",
              width: "100%",
            }}
          >
            <SideMenu />
            <AppNavbar />
            <Box
              component="main"
              sx={{ display: "flex", flexGrow: 1, overflow: "auto" }}
            >
              <Stack
                spacing={2}
                sx={{
                  alignItems: "center",
                  mx: 3,
                  pb: 5,
                  mt: { xs: 8, md: 0 },
                  flexGrow: 1,
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
