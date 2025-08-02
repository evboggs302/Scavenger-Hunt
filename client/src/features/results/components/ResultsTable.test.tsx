import { screen } from "@testing-library/react";
import { ResultsTable } from "./ResultsTable";
import { renderWrapper } from "@test/renderWrapper";

describe("Table", () => {
  const { getAllByTestId, getByTestId } = screen;

  it("should render without data", async () => {
    await renderWrapper(<ResultsTable />);

    expect(getByTestId("table-virtuoso")).toBeInTheDocument();
    expect(getByTestId("table-empty-placeholder")).toHaveTextContent(
      "No results to display yet."
    );
  });
});
