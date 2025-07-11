import { screen } from "@testing-library/dom";
import { renderWrapper } from "@test/renderWrapper";
import { FormTestWrapper } from "@test/FormTestWrapper";
import { CreateNameField } from "./CreateNameField";

describe("CreateNameField", () => {
  const { getByText } = screen;

  beforeEach(() => {});
  afterEach(() => {});

  it("renders properly", async () => {
    await renderWrapper(
      <FormTestWrapper>
        <CreateNameField />
      </FormTestWrapper>
    );

    expect(getByText("Hunt name")).toBeInTheDocument();
  });
});
