import { useEffect, useState } from 'react';
import { createStyles, Table, ScrollArea, Group, Text, Center, rem, Menu, ActionIcon, } from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconTrash, IconDots, IconEdit } from '@tabler/icons-react';
import EditReservationModal from './ReservationsModal';
import { useAppThunkDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { deleteReservation, getAllReservation } from '../../store/mainslice';


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

function Th({ children, reversed, sorted }) {
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

export function ReservationTable({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const dispatch = useAppThunkDispatch();

    const handleEditReservation = () => {
        setIsModalOpen(true);
        // Autres actions à effectuer lors de l'édition d'une réservation
    };

    const handleDelete = async (reservationId) => {
        const response = await dispatch(deleteReservation(reservationId));
        console.log('delete est passée');
    };

    const allReservations = useSelector((state) => state.reservations);

    const fetchReservations = async () => {
        const response = await dispatch(getAllReservation());

        if (response.meta.requestStatus === "fulfilled") {
            console.log(allReservations);
        }
    }

    useEffect(() => {
        fetchReservations();
    }, [])

    const [sortedData] = useState(allReservations);

    const rows = sortedData.map((row) => (
        <>
            <tr key={row.name}>
                <td>{row.title}</td>
                <td>{row.description}</td>
                <td>{row.startDate}</td>
                <td>{row.endDate}</td>
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
                                <Menu.Item icon={<IconTrash size="1rem" stroke={1.5} />} onClick={() => handleDelete(handleDelete(row.id))} color="red">Supprimer</Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </td>
            </tr>
            <EditReservationModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    ));

    return (
        <ScrollArea >
            <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} sx={{ tableLayout: 'fixed' }}>
                <thead>
                    <tr>
                        <Th>Titre</Th>
                        <Th>Description</Th>
                        <Th>Début</Th>
                        <Th>Fin</Th>
                    </tr>
                </thead>
                <tbody>
                    {rows.length > 0 ? (
                        rows
                    ) : (
                        <tr>
                            <td colSpan={Object.keys(data[0]).length}>
                                <Text weight={500} align="center">
                                    Aucun résultat trouvé
                                </Text>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </ScrollArea>
    );
}

