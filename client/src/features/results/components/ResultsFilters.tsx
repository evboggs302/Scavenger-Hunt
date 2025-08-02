import Box from "@mui/material/Box";

type ResultsFiltersProps = {
  prop?: undefined;
};

export const ResultsFilters: React.FC<ResultsFiltersProps> = ({ prop }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <div>ENTER FILTERS HERE</div>
    </Box>
  );
};
