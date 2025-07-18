import { renderWrapper } from "@test/renderWrapper";
import { screen } from "@testing-library/dom";
import { UpdateRecallMessageField } from "./UpdateRecallMessageField";
import { FormTestWrapper } from "@test/FormTestWrapper";

describe("UpdateRecallMessageField", () => {
  const { getByText } = screen;

  it("renders properly", async () => {
    await renderWrapper(
      <FormTestWrapper>
        <UpdateRecallMessageField />
      </FormTestWrapper>
    );

    expect(getByText("Recall message")).toBeInTheDocument();
  });
});
