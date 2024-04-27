import { NavLink } from "@mantine/core";
import { IconLayoutDashboard, IconUsers } from "@tabler/icons-react";

export default function Navbar() {
  return (
    <div>
      Navbar
      <NavLink href="/users" label="Users" leftSection={<IconUsers size="1rem" stroke={1.5} />} />
      <NavLink href="/" label="Dashboard" leftSection={<IconLayoutDashboard size="1rem" stroke={1.5} />} />
    </div>
  );
}
