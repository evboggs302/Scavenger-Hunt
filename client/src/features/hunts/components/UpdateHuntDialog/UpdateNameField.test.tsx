import { screen } from "@testing-library/dom";
import { renderWrapper } from "@test/renderWrapper";
import { FormTestWrapper } from "@test/FormTestWrapper";
import { UpdateNameField } from "./UpdateNameField";

describe("UpdateNameField", () => {
  const { getByText } = screen;

  beforeEach(() => {});
  afterEach(() => {});

  it("renders properly", async () => {
    await renderWrapper(
      <FormTestWrapper>
        <UpdateNameField />
      </FormTestWrapper>
    );

    expect(getByText("Hunt name")).toBeInTheDocument();
  });
});
