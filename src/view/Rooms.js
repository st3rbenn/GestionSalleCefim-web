import { Box } from "@mantine/core";
import { TableSort } from "../component/navbar/RoomsTable";

const Rooms = () => {
  return (
    <Box style={{
      marginLeft: "30px",
      marginRight: "30px",
    }}>
      <h1>Les salles</h1>
      <TableSort />
    </Box>
  );
};

export default Rooms;