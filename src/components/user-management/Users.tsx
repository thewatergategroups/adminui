import { ActionIcon, Anchor, Avatar, Badge, Group, Select, Table, Text, rem } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUsers } from "../../logic/api";
import dummyUsers from "./dummy-users.json";

interface dummyUser {
    name: string;
    email: string;
    avatar: string;
    role: string;
    lastActive: string;
    active: boolean;
    job: string;
    phone: string;
}

const rolesData = ["Manager", "Collaborator", "Contractor"];

const jobColors: Record<string, string> = {
    engineer: "blue",
    "devops engineer": "cyan",
    dev: "pink",
};

const Users: React.FC = () => {
    const { data = [] } = useQuery({ queryFn: getUsers, queryKey: ["users"] });
    console.log("users:", data);

    const displayData = dummyUsers as dummyUser[];

    const rows = displayData.map((item) => (
        <Table.Tr key={item.name}>
            <Table.Td>
                <Group gap="sm">
                    <Avatar size={40} src={item.avatar} radius={40} />
                    <div>
                        <Text fz="sm" fw={500}>
                            {item.name}
                        </Text>
                        <Text fz="xs" c="dimmed">
                            {item.email}
                        </Text>
                    </div>
                </Group>
            </Table.Td>
            <Table.Td>
                <Badge color={jobColors[item.job.toLowerCase()]} variant="light">
                    {item.job}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Anchor component="button" size="sm">
                    {item.email}
                </Anchor>
            </Table.Td>
            <Table.Td>
                <Text fz="sm">{item.phone}</Text>
            </Table.Td>
            <Table.Td>
                <Select data={rolesData} defaultValue={item.role} variant="unstyled" allowDeselect={false} />
            </Table.Td>
            <Table.Td>{item.lastActive}</Table.Td>
            <Table.Td>
                {item.active ? (
                    <Badge fullWidth variant="light">
                        Active
                    </Badge>
                ) : (
                    <Badge color="gray" fullWidth variant="light">
                        Disabled
                    </Badge>
                )}
            </Table.Td>
            <Table.Td>
                <Group gap={0} justify="flex-end">
                    <ActionIcon variant="subtle" color="gray">
                        <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon variant="subtle" color="red">
                        <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="sm">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>User</Table.Th>
                        <Table.Th>Job</Table.Th>
                        <Table.Th>Email</Table.Th>
                        <Table.Th>Phone</Table.Th>
                        <Table.Th>Role</Table.Th>
                        <Table.Th>Last active</Table.Th>
                        <Table.Th>Status</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
};

export default Users;
