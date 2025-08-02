import Tab from "@mui/material/Tab";

type ResultsTabProps = {
  prop?: undefined;
};

export const ResultsTab: React.FC<ResultsTabProps> = ({ prop }) => {
  return <Tab label="Results" value="results" disabled />;
};
