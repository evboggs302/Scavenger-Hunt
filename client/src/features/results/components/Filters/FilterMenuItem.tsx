import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import type { PropsWithChildren } from "react";

type FilterMenuItemProps = {
  isChecked: boolean;
  itemText: string;
};

export const FilterMeuItem: React.FC<
  PropsWithChildren<FilterMenuItemProps>
> = ({ isChecked, itemText }) => {
  return (
    <>
      <Checkbox checked={isChecked} />
      <ListItemText primary={itemText} />
    </>
  );
};
