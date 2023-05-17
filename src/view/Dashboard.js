import { useState } from 'react';
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  rem,
} from '@mantine/core';
import { IconHome2, IconLogout, IconSwitchHorizontal } from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';
import { Link } from 'react-router-dom'; // Importez le composant Link de React Router
import { MdPerson } from 'react-icons/md';
import { MdMeetingRoom, MdSchool } from 'react-icons/md';
import { RiCalendarEventLine } from 'react-icons/ri';

const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

function NavbarLink({ icon: Icon, label, path, active, onClick }) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <Link to={path}>
        <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
          <Icon size="1.2rem" stroke={1.5} />
        </UnstyledButton>
      </Link>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: 'Home', path: '/' },
  { icon: MdPerson, label: 'Formateurs', path: '/admin/formateurs' },
  { icon: MdMeetingRoom, label: 'Salles', path: '/admin/salles' },
  { icon: RiCalendarEventLine, label: 'Reservations', path: '/admin/reservations' },
  { icon: MdSchool, label: 'Formations', path: '/admin/formations' },
];

export function NavbarMinimal() {
  const [active, setActive] = useState(0); // Assurez-vous de définir l'indice initial en fonction de votre route actuelle

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <Navbar height={750} width={{ base: 80 }} p="md">
      <Center>
        <img src="/img/icon_cefim_dashboard.png" alt="Logo" width={40} />
      </Center>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
          <NavbarLink icon={IconLogout} label="Logout" />
        </Stack>
      </Navbar.Section>
    </Navbar>);
}
