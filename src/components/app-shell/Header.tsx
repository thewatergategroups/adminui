import { Avatar, Burger, Group, Menu, rem } from "@mantine/core";
import { IconLogout, IconSettings, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
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
            <UserMenu {...{ onLogout }} />
        </StyledHeader>
    );
}

interface UserMenuProps {
    onLogout: () => void;
}

function UserMenu({ onLogout }: UserMenuProps) {
    const navigate = useNavigate();

    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <Avatar size={40} radius={40} role="button" style={{ cursor: "pointer" }} />
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Application</Menu.Label>
                <Menu.Item onClick={() => navigate("/settings")} leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                    Settings
                </Menu.Item>
                <Menu.Item onClick={onLogout} leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}>
                    Log Out
                </Menu.Item>
                <Menu.Divider />
                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item color="red" leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}>
                    Delete my account
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
