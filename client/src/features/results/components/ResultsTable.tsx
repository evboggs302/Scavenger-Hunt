import { Table } from "@lib/components/Table/Table";
import { useGetFilteredResults } from "../hooks/useGetFilteredResults";

type ResultsTableProps = {
  prop?: undefined;
};

export const ResultsTable: React.FC<ResultsTableProps> = ({ prop }) => {
  const { data, loading } = useGetFilteredResults();

  return <Table emptyPlaceholderText="No results to display yet." />;
};
