import { renderWrapper } from "@test/renderWrapper";
import { screen } from "@testing-library/dom";
import { FormTestWrapper } from "@test/FormTestWrapper";
import { RecallMessageField } from "@lib/components/HuntDialogs/RecallMessageField";

describe("UpdateRecallMessageField", () => {
  const { getByText } = screen;

  it("renders properly", async () => {
    await renderWrapper(
      <FormTestWrapper>
        <RecallMessageField mode="update" />
      </FormTestWrapper>
    );

    expect(getByText("Recall message")).toBeInTheDocument();
  });
});
