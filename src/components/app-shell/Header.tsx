import { Burger, Group } from "@mantine/core";

interface HeaderProps {
  toggleNavBar: () => void;
  navBarExpanded: boolean;
}

export default function Header({ toggleNavBar, navBarExpanded }: HeaderProps) {
  return (
    <Group>
      <Burger opened={navBarExpanded} onClick={toggleNavBar} size="sm" />
      <div>Botantics</div>
    </Group>
  );
}
