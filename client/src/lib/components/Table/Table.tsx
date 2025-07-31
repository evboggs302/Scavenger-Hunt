import { forwardRef, memo } from "react";
import { clamp } from "ramda";
import { TableVirtuoso, type TableVirtuosoProps } from "react-virtuoso";
import MuiTable from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import { EmptyPlaceholder } from "./EmptyPlaceHolder";

const customComponents: TableVirtuosoProps<any, unknown>["components"] = {
  Scroller: forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <MuiTable {...props} style={{ borderCollapse: "separate" }} />
  ),
  TableHead: TableHead,
  TableRow: TableRow,
  TableBody: forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

interface TableProps<T> {
  emptyPlaceholderText?: string;
  data?: TableVirtuosoProps<T, unknown>["data"];
  fixedHeader?: TableVirtuosoProps<T, unknown>["fixedHeaderContent"];
  itemContent?: TableVirtuosoProps<T, unknown>["itemContent"];
  style?: TableVirtuosoProps<T, unknown>["style"];
  tableComponents?: TableVirtuosoProps<T, unknown>["components"];
}

export const Table = <T extends Record<string, any>>({
  data,
  emptyPlaceholderText,
  fixedHeader,
  itemContent,
  style,
  tableComponents,
  ...props
}: TableProps<T>) => {
  if (!data || (data && !data.length)) {
    fixedHeader = undefined;
  }

  function EmptyTablePlaceholder() {
    return <EmptyPlaceholder placeholderText={emptyPlaceholderText} />;
  }

  // header is 57px high
  // rows are 64px high
  // ensure that at least 1 row is renders, up to max of 10
  const height = clamp(120, 697, (data?.length || 0) * 64 + 57);

  return (
    <TableVirtuoso
      data-testid="table-virtuoso"
      style={{ height, width: "100%", overflow: "auto", ...style }}
      data={data}
      components={{
        ...customComponents,
        ...tableComponents,
        EmptyPlaceholder: memo(EmptyTablePlaceholder),
      }}
      fixedHeaderContent={fixedHeader}
      itemContent={itemContent}
      {...props}
    />
  );
};
