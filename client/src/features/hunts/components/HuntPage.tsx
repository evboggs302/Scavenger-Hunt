import React, { SyntheticEvent, useCallback } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { ClueQryContextProvider } from "@lib/context/ClueContext";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { useResponseCount } from "@features/responses/hooks/useResponseCount";
import Button from "@mui/material/Button";
import { useActivateHuntMutation } from "../hooks/useActivateHuntMutation";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";
import CircularProgress from "@mui/material/CircularProgress";

export const HuntPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    count: resCount,
    loading: resLoading,
    error: resError,
  } = useResponseCount();
  const { hunt } = useHuntFragment();
  const [activateHunt, { data, error, loading }] = useActivateHuntMutation();

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

  const handleChange = useCallback(
    (event: SyntheticEvent, value: string) => {
      event?.preventDefault();
      navigate(value, { relative: "path" });
    },
    [navigate]
  );

  const isResponseTabDisabled =
    !hunt.is_active && (resCount === 0 || resLoading || !!resError);

  return (
    <ClueQryContextProvider>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "80vw",
        }}
      >
        {/* <br /> */}
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tabs
            value={location}
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            <Tab label="Info" value="" />
            <Tab label="Clues" value="clues" />
            <Tab label="Teams" value="teams" />
            <Tab
              label="Responses"
              value="responses"
              disabled={isResponseTabDisabled}
            />
          </Tabs>
        </Box>
        <Button
          onClick={activateHunt}
          disabled={loading || hunt.is_active}
          startIcon={loading && <CircularProgress size={20} />}
        >
          Activate hunt
        </Button>
      </Box>
      <Outlet />
    </ClueQryContextProvider>
  );
};
