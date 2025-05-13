import { StripeCharge } from "@generated/graphql";
import { Table } from "@lib/components/Table/Table";
import Box from "@mui/material/Box";
import { ChargesTableHeader } from "./ChargesTableHeader";
import { ChargesTableRow } from "./ChargesTableRow";

type Props = {
  charges: StripeCharge[] | undefined;
};

export const ChargesTable = ({ charges }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "75%",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <h4>Charges</h4>
      <Box
        sx={{
          display: "flex",
          height: "100%",
          width: "100%",
        }}
      >
        <Table
          data={charges}
          fixedHeader={ChargesTableHeader}
          itemContent={(_index, charge) => (
            <ChargesTableRow key={charge.id} charge={charge} />
          )}
          emptyPlaceholderText="No charges to display."
        />
      </Box>
    </Box>
  );
};
