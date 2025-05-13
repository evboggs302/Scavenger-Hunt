import { StripeCharge } from "@generated/graphql";
import TableCell from "@mui/material/TableCell";
import { formatCentsToDollars } from "@features/account/model/formatCentsToDollars";

type ChargesTableRowProps = {
  charge: StripeCharge;
};

export const ChargesTableRow = ({ charge }: ChargesTableRowProps) => {
  const { description, amount, paymentCard, status } = charge;
  return (
    <>
      <TableCell>{status}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell>{formatCentsToDollars(amount)}</TableCell>
      <TableCell>{paymentCard.brand?.toUpperCase()}</TableCell>
      <TableCell>{paymentCard.last4}</TableCell>
      <TableCell></TableCell>
    </>
  );
};
