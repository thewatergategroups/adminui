import { Button, NavLink } from "@mantine/core";
import { IconLayoutDashboard, IconLogout, IconUsers, IconUsersGroup } from "@tabler/icons-react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
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

interface NavItem {
    href: string;
    label: string;
    icon: React.ReactNode;
    active: boolean;
    children?: NavItem[];
}

export default function Navbar({ onLogout }: NavbarProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const isActiveTab = (href: string) => matchPath({ path: location.pathname }, href) !== null;

    const identityChildren = [
        {
            href: "/users",
            label: "Users",
            icon: <IconUsersGroup size="1rem" stroke={1.5} />,
            active: isActiveTab("/users"),
        },
        {
            href: "/roles",
            label: "Roles",
            icon: <IconUsersGroup size="1rem" stroke={1.5} />,
            active: isActiveTab("/roles"),
        },
        {
            href: "/scopes",
            label: "Scopes",
            icon: <IconUsersGroup size="1rem" stroke={1.5} />,
            active: isActiveTab("/scopes"),
        },
        {
            href: "/clients",
            label: "Clients",
            icon: <IconUsersGroup size="1rem" stroke={1.5} />,
            active: isActiveTab("/clients"),
        },
    ];

    const navItems = [
        { href: "/", label: "Dashboard", icon: <IconLayoutDashboard size="1rem" stroke={1.5} />, active: isActiveTab("/") },
        {
            label: "Identity",
            icon: <IconUsers size="1rem" stroke={1.5} />,
            active: identityChildren.some((child) => isActiveTab(child.href)),
            children: identityChildren,
        },
        // Add more nav items here if needed
    ] as NavItem[];

    return (
        <StyledNavbar>
            <div className="nav-items-list">
                {navItems.map((item) => (
                    <NavLink
                        key={item.label}
                        href={item.href}
                        label={item.label}
                        leftSection={item.icon}
                        active={item.active}
                        childrenOffset={item.children ? 28 : 0}
                        onClick={() => navigate(item.href)}
                    >
                        {item.children?.map((child) => (
                            <NavLink
                                key={child.href}
                                label={child.label}
                                leftSection={child.icon}
                                active={child.active}
                                onClick={() => navigate(child.href)}
                            />
                        ))}
                    </NavLink>
                ))}
            </div>
            <Button onClick={onLogout} leftSection={<IconLogout size="1rem" stroke={1.5} />}>
                Log Out
            </Button>
        </StyledNavbar>
    );
}
