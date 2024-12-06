import React, { SyntheticEvent, useCallback, useState } from "react";
import { useHuntContext } from "@lib/context/HuntContext";
import { ClueQryContextProvider } from "@lib/context/ClueContext";
import { Outlet, useLocation, useNavigate } from "react-router";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";

export const HuntPage = () => {
  // const { loading, data } = useHuntContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  let location: "" | "clues" | "teams" | "responses";
  if (pathname.includes("clues")) {
    location = "clues";
  } else if (pathname.includes("teams")) {
    location = "teams";
  } else if (pathname.includes("responses")) {
    location = "responses";
  } else {
    location = "";
  }

  // if (!data?.hunt) {
  //   return null;
  // }

  // const { end_date, is_active } = data.hunt;

  // const huntIsPassed =
  //   !!(end_date && +end_date <= new Date().getTime()) || !!is_active;

  // if (loading) {
  //   return <Skeleton active paragraph={{ rows: 8 }} />;
  // }

  const handleChange = useCallback(
    (event: SyntheticEvent, value: string) => {
      event?.preventDefault();
      navigate(value, { relative: "path" });
    },
    [navigate]
  );

  return (
    <ClueQryContextProvider>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={location}
          onChange={handleChange}
          aria-label="lab API tabs example"
        >
          <Tab label="Info" value="" />
          <Tab label="Clues" value="clues" />
          <Tab label="Teams" value="teams" />
          <Tab label="Responses" value="responses" />
        </Tabs>
      </Box>
      <Outlet />
    </ClueQryContextProvider>
  );
};
