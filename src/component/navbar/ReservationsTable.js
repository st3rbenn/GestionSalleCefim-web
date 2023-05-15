import { useState } from 'react';
import { createStyles, Table, ScrollArea, UnstyledButton, Group, Text, Center, TextInput, rem, Menu, ActionIcon, Modal } from '@mantine/core';
import { keys } from '@mantine/utils';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch, IconTrash, IconDots, IconEdit } from '@tabler/icons-react';
import EditReservationModal from './ReservationsModal';


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
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Group position="apart">
                    <Text fw={500} fz="sm">
                        {children}
                    </Text>
                    <Center className={classes.icon}>
                        <Icon size="0.9rem" stroke={1.5} />
                    </Center>
                </Group>
            </UnstyledButton>
        </th>
    );
}

function filterData(data, search) {
    const query = search.toLowerCase().trim();
    return data.filter((item) =>
        keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
    );
}

function sortData(data, payload) {
    const { sortBy } = payload;

    if (!sortBy) {
        return filterData(data, payload.search);
    }

    return filterData(
        [...data].sort((a, b) => {
            if (payload.reversed) {
                return b[sortBy].localeCompare(a[sortBy]);
            }

            return a[sortBy].localeCompare(b[sortBy]);
        }),
        payload.search
    );
}

export function ReservationTable({ data }) {
    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState(data);
    const [sortBy, setSortBy] = useState(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);


    const setSorting = (field) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(data, { sortBy: field, reversed, search }));
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleEditReservation = () => {
        setIsModalOpen(true);
        // Autres actions à effectuer lors de l'édition d'une réservation
    };

    const handleSearchChange = (event) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
    };

    const rows = sortedData.map((row) => (
        <>
            <tr key={row.name}>
                <td>{row.debut}</td>
                <td>{row.fin}</td>
                <td>{row.durée}</td>
                <td>{row.nb_etudients}</td>
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
        <ScrollArea >
            <TextInput
                placeholder="Rechercher par champ"
                mb="md"
                icon={<IconSearch size="0.9rem" stroke={1.5} />}
                value={search}
                onChange={handleSearchChange}
            />
            <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} sx={{ tableLayout: 'fixed' }}>
                <thead>
                    <tr>
                        <Th
                            sorted={sortBy === 'debut'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('debut')}
                        >
                            Début
                        </Th>
                        <Th
                            sorted={sortBy === 'fin'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('fin')}
                        >
                            Fin
                        </Th>
                        <Th
                            sorted={sortBy === 'durée'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('durée')}
                        >
                            Durée
                        </Th>
                        <Th
                            sorted={sortBy === 'nb_etudients'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('nb_etudients')}
                        >
                            Nombre d'étudiants
                        </Th>
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

