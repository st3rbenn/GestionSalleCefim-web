import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
} from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppThunkDispatch } from '../../store';
import { getAllUser } from '../../store/mainslice';

const jobColors = {
  engineer: 'blue',
  manager: 'cyan',
  designer: 'pink',
};


export function UsersTable({ }) {

  const dispatch = useAppThunkDispatch();
  const allUsers = useSelector((state) => state.users);


  const fetchUser = async () => {
    const response = await dispatch(getAllUser());

    if (response.meta.requestStatus === "fulfilled") {
      console.log(allUsers);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [])

  const theme = useMantineTheme();
  const rows = allUsers.map((item) => (
    <tr key={item.name}>
      <td>
        <Group spacing="sm">
          <Avatar size={30} src={item.avatar} radius={30} />
        </Group>
      </td>
      <td>
        <Text fz="sm" fw={500}>
          {item.lastName}
        </Text>
      </td>
      <td>
        <Text fz="sm" fw={500}>
          {item.firstName}
        </Text>
      </td>
      <td>
        <Anchor component="button" size="sm">
          {item.email}
        </Anchor>
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon>
            <IconPencil size="1rem" stroke={1.5}/>
          </ActionIcon>
          <ActionIcon color="red">
            <IconTrash size="1rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table sx={{ width: "100%" }} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Utilisateurs</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            {/* <th>Numéro</th> */}
            {/* <th>Droits</th> */}
            <th />
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}


