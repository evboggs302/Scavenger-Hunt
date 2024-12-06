import React from "react";
import { Navigate, Outlet } from "react-router";
import { AppNavbar } from "@features/dashboard/components/AppNavbar";
import { UserQryContextProvider } from "@lib/context/UserContext";
import { useTokenContext } from "@lib/context/TokenContext";
import { HuntQryContextProvider } from "@lib/context/HuntContext";
import Box from "@mui/material/Box";
import { SideMenu } from "./SideMenu/SideMenu";
import Stack from "@mui/material/Stack";
import { Header } from "./Header";
import { ClueQryContextProvider } from "@lib/context/ClueContext";

export const Dashboard = () => {
  const { token } = useTokenContext();

  if (!token || token?.length === 0) {
    return <Navigate to="/" replace />;
  }

  return (
    <UserQryContextProvider>
      <HuntQryContextProvider>
        <ClueQryContextProvider>
          <Box sx={{ display: "flex", width: "100%" }}>
            <SideMenu />
            <AppNavbar />
            {/* Main content */}
            <Box component="main">
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
