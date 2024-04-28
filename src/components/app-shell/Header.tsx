import { Burger, Button, Group } from "@mantine/core";
import styled from "styled-components";

const StyledHeader = styled(Group)`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 1.6rem;
`;

interface HeaderProps {
  toggleNavBar: () => void;
  navBarExpanded: boolean;
  onLogout: () => void;
}

export default function Header({ toggleNavBar, navBarExpanded, onLogout }: HeaderProps) {
  return (
    <StyledHeader>
      <Burger opened={navBarExpanded} onClick={toggleNavBar} size="sm" />
      <Button onClick={onLogout}>Logout</Button>
    </StyledHeader>
  );
}
