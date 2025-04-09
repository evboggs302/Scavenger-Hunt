import { render, screen } from "@testing-library/react";
import { CircularLoading } from "./CircularLoading";

describe("CircularLoading", () => {
  it("renders component", () => {
    render(<CircularLoading />);
    expect(screen.getByTestId("circular-loading")).toBeInTheDocument();
  });
});
