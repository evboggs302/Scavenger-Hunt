import { Table } from "@lib/components/Table/Table";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ChargesTableHeader } from "./ChargesTableHeader";
import { ChargesTableRow } from "./ChargesTableRow";
import { useFetchAccountTransactions } from "@pages/account/hooks/useFetchAccountTransactions";

export const ChargesTable = () => {
  const { charges } = useFetchAccountTransactions();

  const data = charges?.filter((charge) => !!charge);

  return (
    <Box
      sx={{
        display: "flex",
        height: "75%",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5">Charges</Typography>
      <Box
        sx={{
          display: "flex",
          height: "100%",
          width: "100%",
        }}
      >
        <Table
          data={data}
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
