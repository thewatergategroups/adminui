import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Header from "./app-shell/Header";
import Navbar from "./app-shell/Navbar";

interface DashboardProps {
  onLogout: () => void;
  children: React.ReactNode;
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
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

export default Dashboard;
