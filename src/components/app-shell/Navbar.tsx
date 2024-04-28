import { NavLink } from "@mantine/core";
import { IconLayoutDashboard, IconSettings, IconUsers } from "@tabler/icons-react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const StyledNavbar = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

export default function Navbar() {
  const location = useLocation();
  const isActiveTab = (href: string) => location.pathname === href;

  const navItems = [
    { href: "/", label: "Dashboard", icon: <IconLayoutDashboard size="1rem" stroke={1.5} />, active: isActiveTab("/") },
    { href: "/users", label: "Users", icon: <IconUsers size="1rem" stroke={1.5} />, active: isActiveTab("/users") },
    { href: "/settings", label: "Settings", icon: <IconSettings size="1rem" stroke={1.5} />, active: isActiveTab("/settings") },
  ];

  return (
    <StyledNavbar>
      {navItems.map((item) => (
        <NavLink key={item.href} href={item.href} label={item.label} leftSection={item.icon} active={item.active} />
      ))}
    </StyledNavbar>
  );
}
