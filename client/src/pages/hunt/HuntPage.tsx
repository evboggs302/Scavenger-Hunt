import { type SyntheticEvent, useCallback } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { useResponseCount } from "@features/responses/hooks/useResponseCount";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";
import { HuntManagementButtons } from "@features/hunts/components/HuntManagementButtons";
import { ResultsTab } from "./results/ResultsTab";

export const HuntPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    count: resCount,
    loading: resLoading,
    error: resError,
  } = useResponseCount();
  const { hunt } = useHuntFragment();

  let location: "" | "clues" | "teams" | "responses" | "results";
  switch (true) {
    case pathname.includes("clues"): {
      location = "clues";
      break;
    }
    case pathname.includes("teams"): {
      location = "teams";
      break;
    }
    case pathname.includes("responses"): {
      location = "responses";
      break;
    }
    case pathname.includes("results"): {
      location = "results";
      break;
    }
    default: {
      location = "";
      break;
    }
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
          <ResultsTab label="Results" value="results" />
        </Tabs>
        <HuntManagementButtons />
      </Box>
      <Box sx={{ flexGrow: 1, width: "100%", height: "100%" }}>
        <Outlet />
      </Box>
    </>
  );
};
