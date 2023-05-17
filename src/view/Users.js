import React from 'react';
import { UsersTable } from '../component/navbar/UsersTable';
import { Box } from "@mantine/core";


const Users = () => {
  // Supposons que vous ayez les données des formateurs dans un tableau appelé "trainersData"

  return (
    <Box style={{
      marginLeft: "30px",
      marginRight: "30px",
    }}>
      <h1>Les formateurs</h1>
      <UsersTable />
    </Box>
  );
};

export default Users;