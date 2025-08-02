import { renderWrapper } from "@test/renderWrapper";
import { screen } from "@testing-library/dom";
import { HomeInfoCard, type HomeInfoCardProps } from "./HomeInfoCard";

const values: HomeInfoCardProps = {
  content: "CONTENT",
  title: "TITLE",
  mediaLocation: "end",
};

describe("HomeInfoCard", () => {
  const { getByAltText, getByTestId } = screen;

  it("renders correctly", async () => {
    await renderWrapper(<HomeInfoCard {...values} />);

    const container = getByTestId("home-info-card");
    expect(container).toBeInTheDocument();
  });

  it("renders media on RIGHT side", async () => {
    await renderWrapper(<HomeInfoCard {...values} />);

    // Get the parent element
    const container = getByTestId("home-info-card");

    // Get the last child element
    const cardMedia = getByAltText("Paella dish");

    // Assert that the last child element is indeed the last child of the parent
    expect(container?.lastElementChild).toBe(cardMedia);
  });

  it("renders media on LEFT side", async () => {
    await renderWrapper(
      <HomeInfoCard {...{ ...values, mediaLocation: "start" }} />
    );

    // Get the parent element
    const container = getByTestId("home-info-card");

    // Get the last child element
    const cardMedia = getByAltText("Paella dish");

    // Assert that the first child element is indeed the first child of the parent
    expect(container?.firstElementChild).toBe(cardMedia);
  });
});
