import { Avatar, Badge, Card, Container, Group, Stack, Text, Title } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import React, { Fragment } from "react";
import { handleGetSelfUser } from "../../logic/api";
import { User } from "../../logic/types";

const FALLBACK_USER: User = {
    id_: "1",
    email: "john.doe@example.com",
    first_name: "John",
    surname: "Doe",
    dob: "1990-01-01",
    postcode: "12345",
    created_at: "2023-01-01",
    roles: ["admin"],
};

const UserInformation: React.FC = () => {
    const { data: user } = useQuery({ queryFn: handleGetSelfUser, queryKey: ["user"], initialData: FALLBACK_USER });

    return (
        <Fragment>
            {user && (
                <Card>
                    <Group style={{ marginBottom: 10 }}>
                        <Group>
                            <div>
                                <Title order={2}>{`${user.first_name} ${user.surname}`}</Title>
                                <Text c="dimmed">{user.email}</Text>
                            </div>
                            <Avatar radius="xl" size="lg" color="blue">
                                <IconUser size={40} />
                            </Avatar>
                        </Group>
                    </Group>

                    <Stack align="flex-start" gap={0}>
                        <Text>Date of Birth: {new Date(user.dob).toDateString()}</Text>
                        <Text>Postcode: {user.postcode}</Text>
                        <Text>Account Created: {new Date(user.created_at)?.toDateString()}</Text>
                    </Stack>

                    <Group style={{ marginTop: 20 }}>
                        {user.roles.map((role, index) => (
                            <Badge key={index} color="blue" variant="light">
                                {role}
                            </Badge>
                        ))}
                    </Group>
                </Card>
            )}
        </Fragment>
    );
};

export default UserInformation;
