import { renderWrapper } from "@test/renderWrapper";
import { screen } from "@testing-library/dom";
import { HomePage } from "./HomePage";

describe("HomePage", () => {
  const { getByTestId, queryAllByTestId } = screen;

  it("renders container", async () => {
    await renderWrapper(<HomePage />);

    const container = getByTestId("home-page-container");
    expect(container).toBeInTheDocument();
  });

  it("renders info cards", async () => {
    await renderWrapper(<HomePage />);

    const cards = queryAllByTestId("home-info-card");
    expect(cards).toHaveLength(6);
  });
});
