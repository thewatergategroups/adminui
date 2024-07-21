import { Button, NavLink } from "@mantine/core";
import { IconArrowBadgeDown, IconBadges, IconLayoutDashboard, IconLogout, IconUsers, IconUsersGroup } from "@tabler/icons-react";
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
            icon: <IconBadges size="1rem" stroke={1.5} />,
            active: isActiveTab("/roles"),
        },
        {
            href: "/scopes",
            label: "Scopes",
            icon: <IconArrowBadgeDown size="1rem" stroke={1.5} />,
            active: isActiveTab("/scopes"),
        },
        {
            href: "/clients",
            label: "Clients",
            icon: <IconUsersGroup size="1rem" stroke={1.5} />,
            active: isActiveTab("/clients"),
        },
    ];


    const tradingChildren = [
        {
            href: "/backtests",
            label: "Backtests",
            icon: <IconBadges size="1rem" stroke={1.5} />,
            active: isActiveTab("/backtests"),
        }
    ];

    const navItems = [
        { href: "/", label: "Dashboard", icon: <IconLayoutDashboard size="1rem" stroke={1.5} />, active: isActiveTab("/") },
        {
            label: "Identity",
            icon: <IconUsers size="1rem" stroke={1.5} />,
            active: identityChildren.some((child) => isActiveTab(child.href)),
            children: identityChildren,
        },
        {
            label: "Secrets",
            icon: <IconUsers size="1rem" stroke={1.5} />,
            active: isActiveTab("/secrets"),
            children: [
                {
                    href: "/secrets",
                    label: "Parameters",
                    icon: <IconUsersGroup size="1rem" stroke={1.5} />,
                    active: isActiveTab("/secrets"),
                }
            ],
        },
        {
            label: "Domains",
            icon: <IconUsers size="1rem" stroke={1.5} />,
            active: isActiveTab("/domains"),
            children: [
                {
                    href: "/domains",
                    label: "Record Sets",
                    icon: <IconUsersGroup size="1rem" stroke={1.5} />,
                    active: isActiveTab("/domains"),
                }
            ],
        },
        {
            label: "Trading",
            icon: <IconBadges size="1rem" stroke={1.5} />,
            active: tradingChildren.some((child) => isActiveTab(child.href)),
            children: tradingChildren,
        }
        // { href: "/settings", label: "Settings", icon: <IconSettings size="1rem" stroke={1.5} />, active: isActiveTab("/settings") },
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
