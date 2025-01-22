import Button from "@mui/material/Button";

type AddAnotherClueBluttonProps = {
  onClick: () => void;
};

export const AddAnotherClueBlutton = ({
  onClick,
}: AddAnotherClueBluttonProps) => {
  return <Button onClick={onClick}>Add another clue</Button>;
};
