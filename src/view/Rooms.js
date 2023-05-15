import { Box } from "@mantine/core";
import { TableSort } from "../component/navbar/RoomsTable";
import dataRoom from "../data/RoomsData";

const Rooms = () => {
  return (
    <Box style={{
      marginLeft: "30px",
      marginRight: "30px",
    }}>
      <h1>Les salles</h1>
      <TableSort data={dataRoom} />
    </Box>
  );
};

export default Rooms;