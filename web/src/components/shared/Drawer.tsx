import { Drawer as MantineDrawer } from "@mantine/core";
import styled from "styled-components";

const StyledDrawer = styled(MantineDrawer)`
    .mantine-Drawer-inner {
        right: 0;
    }
    .mantine-Drawer-body,
    .mantine-Drawer-body > form {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
    }
`;

interface DrawerProps {
    opened: boolean;
    onClose: () => void;
    title: string;
    padding?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    position?: "left" | "right";
    children: React.ReactNode;
}

export default function Drawer({ opened, onClose, title, padding, size = "md", position = "right", children }: DrawerProps) {
    return (
        <StyledDrawer opened={opened} onClose={onClose} title={title} padding={padding} size={size} position={position}>
            {children}
        </StyledDrawer>
    );
}
