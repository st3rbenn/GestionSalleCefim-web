import React from 'react';
import { UsersTable } from '../component/navbar/TrainersTable';
import data from '../data/UsersData';
import { Box } from "@mantine/core";


const Trainers = () => {
  // Supposons que vous ayez les données des formateurs dans un tableau appelé "trainersData"

  return (
    <Box style={{
      marginLeft: "30px",
      marginRight: "30px",
    }}>
      <h1>Les formateurs</h1>
      <UsersTable data={data} />
    </Box>
  );
};

export default Trainers;