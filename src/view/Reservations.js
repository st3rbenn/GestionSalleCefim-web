import { Box } from "@mantine/core";
import { ReservationTable } from "../component/navbar/ReservationsTable";
import dataReservations from "../data/ReservationsData";

const Reservations = () => {
  return (
    <Box style={{
      marginLeft: "30px",
      marginRight: "30px",
    }}>
      <h1>Les reservations</h1>
      <ReservationTable data={dataReservations} />
    </Box>
  );
};

export default Reservations;