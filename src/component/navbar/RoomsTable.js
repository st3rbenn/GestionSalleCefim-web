import { useEffect, useState } from 'react';
import { createStyles, Table, ScrollArea, UnstyledButton, Group, Text, Center, TextInput, rem, Menu, ActionIcon } from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch, IconEdit, IconTrash, IconDots } from '@tabler/icons-react';
import { useAppThunkDispatch } from '../../store';
import EditReservationModal from './ReservationsModal';
import { useSelector } from 'react-redux';
import { getAllRoom } from '../../store/mainslice';

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },
  control: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
  icon: {
    width: rem(21),
    height: rem(21),
    borderRadius: rem(21),
  },
}));

function Th({ children, reversed, sorted, onSort }) {
  const { classes } = useStyles();
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <th className={classes.th}>
      <Group position="apart">
        <Text fw={500} fz="sm">
          {children}
        </Text>
        <Center className={classes.icon}>
          <Icon size="0.9rem" stroke={1.5} />
        </Center>
      </Group>
    </th>
  );
}

export function TableSort() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleEditReservation = () => {
    setIsModalOpen(true);
    // Autres actions à effectuer lors de l'édition d'une réservation
  };
  const dispatch = useAppThunkDispatch();
  const allRooms = useSelector((state) => state.rooms);

  const fetchRooms = async () => {
    const response = await dispatch(getAllRoom());

    if (response.meta.requestStatus === 'fulfilled') {
      console.log('TEST', allRooms);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const [sortedData] = useState(allRooms);

  const rows = sortedData.map((row) => (
    <>
      <tr key={row.name}>
        <td>{row.location}</td>
        <td>{row.capacity}</td>
        <td>{row.equipment}</td>
        <td>
          <Group spacing={0} position="right">
            <Menu
              transitionProps={{ transition: 'pop' }}
              withArrow
              position="bottom-end"
              withinPortal
            >
              <Menu.Target>
                <ActionIcon>
                  <IconDots size="1rem" stroke={1.5} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item icon={<IconEdit size="1rem" stroke={1.5} />} onClick={handleEditReservation}>Modifier</Menu.Item>
                <Menu.Item icon={<IconTrash size="1rem" stroke={1.5} />} color="red">Supprimer</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </td>
      </tr>
      <EditReservationModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  ));

  return (
    <ScrollArea>
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} sx={{ tableLayout: 'fixed' }}>
        <thead>
          <tr>
            <Th>Location</Th>
            <Th>Nombre de place</Th>
            <Th>Equipement</Th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
