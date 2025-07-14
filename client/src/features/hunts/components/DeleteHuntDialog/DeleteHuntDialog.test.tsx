import { renderWrapper } from "@test/renderWrapper";
import { DeleteHuntDialog } from "./DeleteHuntDialog";
import { fireEvent, screen, waitFor } from "@testing-library/dom";
import { useDeleteHuntMutation } from "../../hooks/useDeleteHuntMutation";

const mockedDelete = vi.fn();
vi.mock("../../hooks/useDeleteHuntMutation");

describe("DeleteHuntDialog", () => {
  const { getByRole, getByTestId } = screen;

  const handleCloseMock = vi.fn();

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders correctly", async () => {
    vi.mocked(useDeleteHuntMutation).mockReturnValue([
      mockedDelete,
      { loading: false, error: undefined },
    ]);

    await renderWrapper(<DeleteHuntDialog handleClose={handleCloseMock} />);

    expect(getByTestId("delete-hunt-title")).toBeInTheDocument();
  });

  it("cancels delete", async () => {
    vi.mocked(useDeleteHuntMutation).mockReturnValue([
      mockedDelete,
      { loading: false, error: undefined },
    ]);

    await renderWrapper(<DeleteHuntDialog handleClose={handleCloseMock} />);

    const cancelBtn = getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelBtn);
    expect(handleCloseMock).toBeCalledTimes(1);
  });

  it("confirms delete is disabled after click", async () => {
    vi.mocked(useDeleteHuntMutation).mockReturnValue([
      mockedDelete,
      { loading: true, error: undefined },
    ]);

    await renderWrapper(<DeleteHuntDialog handleClose={handleCloseMock} />);

    const confirmBtn = getByRole("button", { name: "Delete" });
    fireEvent.submit(confirmBtn);
    expect(mockedDelete).toBeCalledTimes(1);
    expect(confirmBtn).toBeDisabled();
  });

  it("confirms delete is fired", async () => {
    vi.mocked(useDeleteHuntMutation).mockReturnValue([
      mockedDelete,
      { loading: false, error: undefined },
    ]);

    await renderWrapper(<DeleteHuntDialog handleClose={handleCloseMock} />);

    const confirmBtn = getByRole("button", { name: "Delete" });
    fireEvent.submit(confirmBtn);

    await waitFor(() => {
      expect(mockedDelete).toBeCalledTimes(1);
      expect(handleCloseMock).toBeCalledTimes(1);
    });
  });
});
