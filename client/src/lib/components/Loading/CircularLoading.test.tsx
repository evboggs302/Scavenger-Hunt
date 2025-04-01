import { render, screen } from "@testing-library/react";
import { CircularLoading } from "./CircularLoading";

describe("CircularLoading", () => {
  it("renders ccomponent", () => {
    render(<CircularLoading />);
    expect(screen.getByTestId("circular-loading")).toBeInTheDocument();
  });
});
