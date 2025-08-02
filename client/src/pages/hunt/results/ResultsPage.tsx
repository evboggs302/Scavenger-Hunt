import Divider from "@mui/material/Divider";
import { ResultsFilters } from "@features/results/components/ResultsFilters";
import { ResultsTable } from "@features/results/components/ResultsTable";
import { FiltersContextProvider } from "@features/results/context/FiltersContextProvider";

export const ResultsPage = () => {
  return (
    <FiltersContextProvider>
      <ResultsFilters />
      <Divider sx={{ margin: "10px auto" }} />
      <ResultsTable />
    </FiltersContextProvider>
  );
};
