import { render, screen } from "@testing-library/react";
import { TryAgainAlert } from "./TryAgainAlert";

describe("TryAgainAlert", () => {
  it("renders component", () => {
    render(<TryAgainAlert />);
    expect(screen.getByText("Please try again later.")).toBeInTheDocument();
  });

  it("renders component", () => {
    render(<TryAgainAlert message="Doh!" />);
    expect(
      screen.getByText("Doh! Please try again later.")
    ).toBeInTheDocument();
  });
});
