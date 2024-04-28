import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import styled from "styled-components";
import Header from "./app-shell/Header";
import Navbar from "./app-shell/Navbar";

const StyledMain = styled(AppShell.Main)`
    background-color: var(--main-content-bg);
    width: 100%;
    height: 100%;
`;

interface DashboardProps {
    onLogout: () => void;
    children?: React.ReactNode;
}

function Dashboard({ onLogout, children }: DashboardProps) {
    const [opened, { toggle: toggleNavBar }] = useDisclosure(true);

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: { mobile: !opened, desktop: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Header {...{ toggleNavBar, navBarExpanded: opened, onLogout }} />
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <Navbar {...{ onLogout }} />
            </AppShell.Navbar>

            <StyledMain>{children}</StyledMain>
        </AppShell>
    );
}

export default Dashboard;
