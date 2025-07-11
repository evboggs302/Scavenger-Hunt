import { render, screen } from "@testing-library/react";
import { Table } from "./Table";
import TableRow from "@mui/material/TableRow";
import { TextTableCell } from "./TextTableCell";

describe("Table", () => {
  const { getAllByTestId, getByTestId } = screen;

  it("should render without data", () => {
    render(<Table data={[]} />);

    expect(getByTestId("table-virtuoso")).toBeInTheDocument();
    expect(getByTestId("table-empty-placeholder")).toHaveTextContent(
      "No data to display."
    );
  });

  it("should display custom empty placeholder when no data is provided", () => {
    const text = "No test data available";
    render(<Table data={[]} emptyPlaceholderText={text} />);

    expect(getByTestId("table-empty-placeholder")).toHaveTextContent(text);
  });

  it("should render fixed header when provided data", () => {
    const FixedHeader = () => (
      <TableRow>
        <TextTableCell>ID</TextTableCell>
        <TextTableCell>ITEM</TextTableCell>
      </TableRow>
    );

    render(
      <Table
        data={[
          { id: "1234", item: "item1" },
          { id: "2468", item: "item2" },
        ]}
        fixedHeader={FixedHeader}
      />
    );

    const headerCells = getAllByTestId("text-table-cell");
    expect(headerCells).toHaveLength(2);
    expect(headerCells[0]).toHaveTextContent("ID");
    expect(headerCells[1]).toHaveTextContent("ITEM");
  });
});
