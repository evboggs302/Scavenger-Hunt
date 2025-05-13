import { CSSProperties, PropsWithChildren } from "react";
import TableCell, { TableCellProps } from "@mui/material/TableCell";

interface TextTableCellProps extends TableCellProps {
  style?: CSSProperties;
}

export const TextTableCell: React.FC<PropsWithChildren<TextTableCellProps>> = ({
  style,
  children,
  ...rest
}) => {
  return (
    <TableCell
      style={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        ...style,
      }}
      {...rest}
    >
      {children}
    </TableCell>
  );
};
