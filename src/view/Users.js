import React from 'react';
import { UsersTable } from '../component/navbar/UsersTable';
import data from '../data/UsersData';
import { Box } from "@mantine/core";


const Users = () => {
  // Supposons que vous ayez les données des formateurs dans un tableau appelé "trainersData"

  return (
    <Box style={{
      marginLeft: "30px",
      marginRight: "30px",
    }}>
      <h1>Les utilisateurs</h1>
      <UsersTable data={data} />
    </Box>
  );
};

export default Users;