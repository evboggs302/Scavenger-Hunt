import { TableBody, TableCell, TableRow } from "@mui/material";
import Box from "@mui/material/Box";

type EmptyPlaceholderProps = {
  placeholderText?: string;
};

export const EmptyPlaceholder: React.FC<EmptyPlaceholderProps> = ({
  placeholderText,
}) => {
  return (
    <TableBody>
      <TableRow>
        <TableCell>
          <Box
            data-testid="table-empty-placeholder"
            style={{ width: "100%", textAlign: "center", padding: "20px" }}
          >
            {placeholderText ? placeholderText : "No data to display."}
          </Box>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};
