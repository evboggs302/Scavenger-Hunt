import { screen } from "@testing-library/dom";
import { renderWrapper } from "@test/renderWrapper";
import { FormTestWrapper } from "@test/FormTestWrapper";
import { HuntNameField } from "@lib/components/HuntDialogs/HuntNameField";

describe("UpdateNameField", () => {
  const { getByRole } = screen;

  it("renders properly", async () => {
    await renderWrapper(
      <FormTestWrapper>
        <HuntNameField mode="update" />
      </FormTestWrapper>
    );

    expect(getByRole("textbox", { name: "Hunt name" })).toBeInTheDocument();
  });
});
