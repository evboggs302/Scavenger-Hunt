import Divider from "@mui/material/Divider";
import { ResultsFilters } from "@features/results/components/ResultsFilters";
import { ResultsTable } from "@features/results/components/ResultsTable";
import { ResultsFilterFormProvider } from "@features/results/context/ResultsFilterFormProvider";

export const ResultsPage = () => {
  return (
    <ResultsFilterFormProvider>
      <ResultsFilters />
      <Divider sx={{ margin: "10px auto" }} />
      <ResultsTable />
    </ResultsFilterFormProvider>
  );
};
