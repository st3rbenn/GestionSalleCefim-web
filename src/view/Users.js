import React from 'react';
import { UsersTable } from '../component/navbar/UsersTable';
import { Box, Button } from "@mantine/core";
import { RiAddLine } from 'react-icons/ri';


const Users = () => {
  // Supposons que vous ayez les données des formateurs dans un tableau appelé "trainersData"

  return (
    <Box style={{
      marginLeft: "30px",
      marginRight: "30px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Les formateurs</h1>
        <Button style={{ marginTop: "auto", marginBottom: "auto", width: "50px"}}>
          <RiAddLine style={{ textAlign:"center",}}/>
        </Button>
      </div>
      <UsersTable />
    </Box>
  );
};

export default Users;