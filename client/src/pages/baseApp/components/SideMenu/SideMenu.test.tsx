import { renderWrapper } from "@test/renderWrapper";
import { fireEvent, screen } from "@testing-library/dom";
import { SideMenu } from "./SideMenu";

const navigate = vi.fn();
vi.mock(import("react-router"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

describe("SideMenu", () => {
  const { getByAltText } = screen;

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders container", async () => {
    await renderWrapper(<SideMenu />);

    const logo = getByAltText("journey-forge-icon");
    expect(logo).toBeInTheDocument();
  });

  it("click logo navigates ", async () => {
    await renderWrapper(<SideMenu />);
    const logo = getByAltText("journey-forge-icon");

    fireEvent.click(logo);
    expect(navigate).toBeCalled();
  });
});
