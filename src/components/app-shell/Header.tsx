import { Burger, Button, Group } from "@mantine/core";

interface HeaderProps {
  toggleNavBar: () => void;
  navBarExpanded: boolean;
  onLogout: () => void;
}

export default function Header({ toggleNavBar, navBarExpanded, onLogout }: HeaderProps) {
  return (
    <Group>
      <Burger opened={navBarExpanded} onClick={toggleNavBar} size="sm" />
      <div>Botantics</div>
      <Button onClick={onLogout}>Logout</Button>
    </Group>
  );
}
