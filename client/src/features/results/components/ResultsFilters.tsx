import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useFiltersFormContext } from "../hooks/useFiltersFormContext";
import { useCallback } from "react";
import { ClueFilter } from "./Filters/ClueFilter";
import { TeamFilter } from "./Filters/TeamFilter";

export const ResultsFilters: React.FC = () => {
  const { reset } = useFiltersFormContext();
  const resetFilters = useCallback(() => reset(), [reset]);

  return (
    <Box
      sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
    >
      <ClueFilter />
      <TeamFilter />
      <Box sx={{ marginLeft: 2 }}>
        <Button color="warning" onClick={resetFilters}>
          Reset
        </Button>
      </Box>
    </Box>
  );
};
