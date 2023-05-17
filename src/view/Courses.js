import { Box } from "@mantine/core";
import React from 'react';
import { CoursesTable } from "../component/navbar/CoursesTable";

const Courses = () => {
    return (
      <Box style={{
        marginLeft: "30px",
        marginRight: "30px",
      }}>
        <h1>Les formations</h1>
        <CoursesTable />
      </Box>
    );
  };
  
  export default Courses;