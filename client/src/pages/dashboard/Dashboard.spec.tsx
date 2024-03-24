import React from "react";
import { render } from "../../testUtils/customRenderer";
import { Dashboard } from "./Dashboard";

describe("Dashboard Component", () => {
  it("should render without crashing", () => {
    const { getByTestId } = render(<Dashboard />);
    const page = getByTestId("dashboard-page");
    expect(page).toBeInTheDocument();
  });
});
