import { ActionIcon, Avatar, Badge, Group, List, Paper, Table, Text, rem } from "@mantine/core";
import {  IconTrash } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { handleGetClients, handleDeleteClient } from "../../logic/api";
import { Client } from "../../logic/types";
import { IconUser } from "@tabler/icons-react";
import EditClient from "./EditClients";
import CreateClient from "./CreateClient";


const Clients: React.FC = () => {
    const queryClient = useQueryClient();
    const { data = [] } = useQuery({ queryFn: handleGetClients, queryKey: ["clients"] });
    
    const { mutate: deleteClient } = useMutation({
        mutationFn: handleDeleteClient,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clients"] });
        },
    });

    const displayData = data as Client[];
    const rows = displayData.map((item) => (
        <Table.Tr key={item.id_}>
            <Table.Td>
                <Avatar radius="xl" size="lg" color="blue">
                    <IconUser size={40} />
                </Avatar>
            </Table.Td>
            <Table.Td>
                <Group gap="sm">
                    {/* <Avatar size={40} src={item.avatar} radius={40} /> */}
                    <div>
                        <Text fz="sm" fw={500}>
                            {item.name}
                        </Text>
                        <Text fz="xs" c="dimmed">
                            {item.description}
                        </Text>
                    </div>
                </Group>
            </Table.Td>
            <Table.Td>
            <Text fz="sm" fw={500}>
                {item.id_}
            </Text>
            </Table.Td>
            <Table.Td>
                <Text fz="sm" fw={500}>
                    {item.type}
                </Text>
            </Table.Td>
            <Table.Td>
                <List>
                    {item.roles.map((role, index) => (
                        <List.Item key={index}>
                            <Badge color="blue" variant="light">
                                {role}
                            </Badge>
                        </List.Item>
                    ))}
                </List>
            </Table.Td>
            <Table.Td>
                <List>
                    {item.redirect_uris.map((role, index) => (
                        <List.Item key={index}>
                            <Badge color="blue" variant="light">
                                {role}
                            </Badge>
                        </List.Item>
                    ))}
                </List>
            </Table.Td>
            <Table.Td>
                <List>
                    {item.grant_types.map((role, index) => (
                        <List.Item key={index}>
                            <Badge color="blue" variant="light">
                                {role}
                            </Badge>
                        </List.Item>
                    ))}
                </List>
            </Table.Td>

            <Table.Td>
                <Group gap={0} justify="flex-end">
                    <EditClient client={item} />
                    <ActionIcon onClick={()=> {deleteClient(item)}} variant="subtle" color="red">
                        <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Paper withBorder p="md" radius="md" key="Clients">
        <div className="table-controls">
            <CreateClient />
        </div>
        <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="sm" highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th></Table.Th>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>ID</Table.Th>
                        <Table.Th>Type</Table.Th>
                        <Table.Th>Roles</Table.Th>
                        <Table.Th>Redirect URI's</Table.Th>
                        <Table.Th>Grant Types</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
        </Paper>

    );
};

export default Clients;
