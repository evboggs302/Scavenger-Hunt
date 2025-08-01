import { type SyntheticEvent, useCallback } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { useResponseCount } from "@features/responses/hooks/useResponseCount";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";
import { HuntManagementButtons } from "@features/hunts/components/HuntManagementButtons";

export const HuntPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    count: resCount,
    loading: resLoading,
    error: resError,
  } = useResponseCount();
  const { hunt } = useHuntFragment();

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
    <>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Tabs value={location} onChange={handleChange} aria-label="hunt tabs">
          <Tab label="Info" value="" />
          <Tab label="Clues" value="clues" />
          <Tab label="Teams" value="teams" />
          <Tab
            label="Responses"
            value="responses"
            disabled={isResponseTabDisabled}
          />
        </Tabs>
        <HuntManagementButtons />
      </Box>
      <Box sx={{ flexGrow: 1, width: "100%", height: "100%" }}>
        <Outlet />
      </Box>
    </>
  );
};
