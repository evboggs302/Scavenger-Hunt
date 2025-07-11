import { render } from "@testing-library/react";
import { AppFooter } from "./AppFooter";

describe("Footer", () => {
  it("Should match snapshot", async () => {
    const component = render(<AppFooter />);
    expect(component).toMatchSnapshot();
  });
});
