import { Button, NavLink } from "@mantine/core";
import { IconLayoutDashboard, IconLogout, IconSettings, IconUsers } from "@tabler/icons-react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const StyledNavbar = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    .nav-items-list {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
    }
`;

interface NavbarProps {
    onLogout: () => void;
}

export default function Navbar({ onLogout }: NavbarProps) {
    const location = useLocation();
    const isActiveTab = (href: string) => location.pathname === href;

    const navItems = [
        { href: "/", label: "Dashboard", icon: <IconLayoutDashboard size="1rem" stroke={1.5} />, active: isActiveTab("/") },
        { href: "/users", label: "Users", icon: <IconUsers size="1rem" stroke={1.5} />, active: isActiveTab("/users") },
        { href: "/settings", label: "Settings", icon: <IconSettings size="1rem" stroke={1.5} />, active: isActiveTab("/settings") },
    ];

    return (
        <StyledNavbar>
            <div className="nav-items-list">
                {navItems.map((item) => (
                    <NavLink key={item.href} href={item.href} label={item.label} leftSection={item.icon} active={item.active} />
                ))}
            </div>
            <Button onClick={onLogout} leftSection={<IconLogout size="1rem" stroke={1.5} />}>
                Log Out
            </Button>
        </StyledNavbar>
    );
}
