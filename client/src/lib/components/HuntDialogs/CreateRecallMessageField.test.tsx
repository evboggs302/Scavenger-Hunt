import { screen } from "@testing-library/dom";
import { renderWrapper } from "@test/renderWrapper";
import { FormTestWrapper } from "@test/FormTestWrapper";
import { RecallMessageField } from "./RecallMessageField";

describe("CreateRecallMessageField", () => {
  const { getByText } = screen;

  beforeEach(() => {});
  afterEach(() => {});

  it("renders properly", async () => {
    await renderWrapper(
      <FormTestWrapper>
        <RecallMessageField mode="create" />
      </FormTestWrapper>
    );

    expect(getByText("Recall message")).toBeInTheDocument();
  });
});
