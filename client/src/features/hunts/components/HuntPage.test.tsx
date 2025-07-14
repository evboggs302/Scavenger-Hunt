import { renderWrapper } from "@test/renderWrapper";
import { fireEvent, screen } from "@testing-library/dom";
import { HuntPage } from "./HuntPage";

const navigate = vi.fn();
vi.mock(import("react-router"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

describe("HuntPage", () => {
  const { getByRole } = screen;

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders correctly", async () => {
    await renderWrapper(<HuntPage />);

    const tabs = getByRole("tablist", { name: "hunt tabs" });
    expect(tabs).toBeInTheDocument();
  });

  it("default tab (info)", async () => {
    await renderWrapper(<HuntPage />);

    const infoTab = getByRole("tab", { name: "Info" });
    expect(infoTab.getAttribute("aria-selected")).toBe("true");
  });

  it("clues tab selected", async () => {
    await renderWrapper(<HuntPage />, {
      params: {
        clues: "",
      },
    });

    const cluesTab = getByRole("tab", { name: "Clues" });
    expect(cluesTab.getAttribute("aria-selected")).toBe("true");
  });

  it("teams tab", async () => {
    await renderWrapper(<HuntPage />, {
      params: {
        teams: "",
      },
    });

    const teamsTab = getByRole("tab", { name: "Teams" });
    expect(teamsTab.getAttribute("aria-selected")).toBe("true");
  });

  it("responses tab", async () => {
    await renderWrapper(<HuntPage />, {
      params: {
        responses: "",
      },
    });

    const responsesTab = getByRole("tab", { name: "Responses" });
    expect(responsesTab.getAttribute("aria-selected")).toBe("true");
  });

  describe("Navigation clicks fire", () => {
    it("Info tab clicked", async () => {
      await renderWrapper(<HuntPage />, {
        params: {
          clues: "",
        },
      });

      const infoTab = getByRole("tab", { name: "Info" });
      fireEvent.click(infoTab);
      expect(navigate).toHaveBeenCalledWith("", { relative: "path" });
    });

    it("Clues tab clicked", async () => {
      await renderWrapper(<HuntPage />);

      const cluesTab = getByRole("tab", { name: "Clues" });
      fireEvent.click(cluesTab);
      expect(navigate).toHaveBeenCalledWith("clues", { relative: "path" });
    });

    it("Teams tab clicked", async () => {
      await renderWrapper(<HuntPage />);

      const teamsTab = getByRole("tab", { name: "Teams" });
      fireEvent.click(teamsTab);
      expect(navigate).toHaveBeenCalledWith("teams", { relative: "path" });
    });

    it("Responses tab clicked", async () => {
      await renderWrapper(<HuntPage />);

      const responsesTab = getByRole("tab", { name: "Responses" });
      fireEvent.click(responsesTab);
      expect(navigate).toHaveBeenCalledWith("responses", { relative: "path" });
    });
  });
});
