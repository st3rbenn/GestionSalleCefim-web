import { Table, Text, ScrollArea, useMantineTheme } from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllCourse } from '../../store/mainslice';

export function CoursesTable() {
  const allCourses = useSelector((state) => state.courses);
  const dispatch = useDispatch();

  const fetchCourses = async () => {
    const response = await dispatch(getAllCourse());

    if (response.meta.requestStatus === "fulfilled") {
      console.log('Ptit con va ', allCourses);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, [])

  const [sortedData] = useState(allCourses);
  const theme = useMantineTheme();

  const rows = sortedData && sortedData.map((row) => (
    <tr key={row.name}>
      <td>
        <Text>{row.name}</Text>
      </td>
      <td>
        <Text>{row.startDate}</Text>
      </td>
      <td>
        <Text>{row.endDate}</Text>
      </td>
      <td>
        <Text align="center">{row.nbStudents}</Text>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table sx={{ width: "100%" }} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Début</th>
            <th>Fin</th>
            <th>Nombre d'étudiants</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}


