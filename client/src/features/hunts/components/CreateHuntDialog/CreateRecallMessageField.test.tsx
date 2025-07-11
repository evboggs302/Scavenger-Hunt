import { screen } from "@testing-library/dom";
import { renderWrapper } from "@test/renderWrapper";
import { FormTestWrapper } from "@test/FormTestWrapper";
import { CreateRecallMessageField } from "./CreateRecallMessageField";

describe("CreateRecallMessageField", () => {
  const { getByText } = screen;

  beforeEach(() => {});
  afterEach(() => {});

  it("renders properly", async () => {
    await renderWrapper(
      <FormTestWrapper>
        <CreateRecallMessageField />
      </FormTestWrapper>
    );

    expect(getByText("Recall message")).toBeInTheDocument();
  });
});
