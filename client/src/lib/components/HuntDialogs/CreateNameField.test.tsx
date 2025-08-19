import { screen } from "@testing-library/dom";
import { renderWrapper } from "@test/renderWrapper";
import { FormTestWrapper } from "@test/FormTestWrapper";
import { HuntNameField } from "@lib/components/HuntDialogs/HuntNameField";

describe("CreateNameField", () => {
  const { getByRole } = screen;

  it("renders properly", async () => {
    await renderWrapper(
      <FormTestWrapper>
        <HuntNameField mode="create" />
      </FormTestWrapper>
    );

    expect(getByRole("textbox", { name: "Hunt name" })).toBeInTheDocument();
  });
});
