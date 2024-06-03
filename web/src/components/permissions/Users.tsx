import { ActionIcon, Anchor, Avatar, Badge, Group, List, Table, Text, rem } from "@mantine/core";
import { IconTrash, IconUser, IconUserPlus } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";
import { getUsers } from "../../logic/api";
import { User } from "../../logic/types";
import EditUser from "./editUser";

const StyledContainer = styled.div``;
const Users: React.FC = () => {
    const queryClient = useQueryClient();
    const { data = [] } = useQuery({ queryFn: getUsers, queryKey: ["users"] });

    const { mutate, isLoading: isCreatingUser } = useMutation({
        mutationFn: (newUser) => {
            queryClient.cancelQueries("users");
            const previousValue = queryClient.getQueryData("users");
            queryClient.setQueryData("users", (old: User[] = []) => [...old, newUser]);
            return () => queryClient.setQueryData("users", previousValue);
        },
        onSettled: () => {
            queryClient.invalidateQueries(["users"]);
        },
    });

    const displayData = data as User[];

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
                            {item.first_name} {item.surname}
                        </Text>
                        <Text fz="xs" c="dimmed">
                            {item.email}
                        </Text>
                    </div>
                </Group>
            </Table.Td>
            <Table.Td>
                <Anchor component="button" size="sm">
                    {item.email}
                </Anchor>
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
            <Table.Td>{new Date(item.created_at).toDateString()}</Table.Td>

            <Table.Td>
                <Group gap={0} justify="flex-end">
                    <EditUser user={item} />
                    <ActionIcon variant="subtle" color="red">
                        <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <StyledContainer>
            <div className="table-controls">
                <ActionIcon loading={isCreatingUser} loaderProps={{ type: "dots" }}>
                    <IconUserPlus />
                </ActionIcon>
            </div>
            <Table.ScrollContainer minWidth={800}>
                <Table verticalSpacing="sm" highlightOnHover>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th></Table.Th>
                            <Table.Th>User</Table.Th>
                            <Table.Th>Email</Table.Th>
                            <Table.Th>Roles</Table.Th>
                            <Table.Th>Created At</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </StyledContainer>
    );
};

export default Users;
