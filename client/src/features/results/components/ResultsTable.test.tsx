import { screen } from "@testing-library/react";
import { ResultsTable } from "./ResultsTable";
import { renderWrapper } from "@test/renderWrapper";
import { FormTestWrapper } from "@test/FormTestWrapper";

describe("Table", () => {
  const { getByTestId } = screen;

  it("should render without data", async () => {
    await renderWrapper(
      <FormTestWrapper formValues={{ clueFilter: [], teamFilter: [] }}>
        <ResultsTable />
      </FormTestWrapper>
    );

    expect(getByTestId("table-virtuoso")).toBeInTheDocument();
    expect(getByTestId("table-empty-placeholder")).toHaveTextContent(
      "No results to display yet."
    );
  });
});
