import Tab, { TabProps } from "@mui/material/Tab";

type ResultsTabProps = TabProps & {
  prop?: undefined;
};

export const ResultsTab: React.FC<ResultsTabProps> = (props) => {
  /**
   * @todo add a condition for the tab to disabled
   */
  return <Tab label="Results" value="results" {...props} />;
};
