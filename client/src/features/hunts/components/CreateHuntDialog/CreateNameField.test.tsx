import { screen } from "@testing-library/dom";
import { renderWrapper } from "@test/renderWrapper";
import { FormTestWrapper } from "@test/FormTestWrapper";
import { CreateNameField } from "./CreateNameField";

describe("CreateNameField", () => {
  const { getByRole } = screen;

  it("renders properly", async () => {
    await renderWrapper(
      <FormTestWrapper>
        <CreateNameField />
      </FormTestWrapper>
    );

    expect(getByRole("textbox", { name: "Hunt name" })).toBeInTheDocument();
  });
});
