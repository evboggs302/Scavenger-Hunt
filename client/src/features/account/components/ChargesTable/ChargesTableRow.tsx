import { StripeCharge } from "@generated/graphql";
import TableCell from "@mui/material/TableCell";
import { formatCentsToDollars } from "@features/account/model/formatCentsToDollars";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ReportIcon from "@mui/icons-material/Report";

type ChargesTableRowProps = {
  charge: StripeCharge;
};

export const ChargesTableRow = ({ charge }: ChargesTableRowProps) => {
  const { description, amount, paymentCard, status } = charge;
  return (
    <>
      <TableCell>
        {status === "succeeded" ? (
          <CheckCircleOutlineIcon color="success" />
        ) : (
          <ReportIcon color="error" />
        )}
      </TableCell>
      <TableCell>{description}</TableCell>
      <TableCell>{formatCentsToDollars(amount)}</TableCell>
      <TableCell>{paymentCard.brand?.toUpperCase()}</TableCell>
      <TableCell>{paymentCard.last4}</TableCell>
      <TableCell></TableCell>
    </>
  );
};
