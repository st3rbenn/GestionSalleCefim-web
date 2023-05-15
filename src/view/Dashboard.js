import { useState } from 'react';
import { Navbar, Center, Stack } from '@mantine/core';
import { IconHome2, IconLogout, IconSwitchHorizontal, } from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';
import { MdMeetingRoom } from 'react-icons/md';
import { RiCalendarEventLine } from 'react-icons/ri';
import { MdPerson } from 'react-icons/md';
import NavbarLink from '../component/navbar/NavbarLink';



const mockdata = [
  { icon: IconHome2, label: 'Home', path: '/' },
  { icon: MdPerson, label: 'Formateurs', path: '/formateurs' },
  { icon: MdMeetingRoom, label: 'Salles', path: '/salles' },
  { icon: RiCalendarEventLine, label: 'Reservations', path: '/reservations' },
];

export function NavbarMinimal() {
  const [active, setActive] = useState(2);

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
        <MantineLogo type="mark" size={30} />
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
    </Navbar>
  );
}
