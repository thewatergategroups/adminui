import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getSelfUser } from "../../logic/api";
import { Avatar, Badge, Card, Container, Group, Text, Title } from '@mantine/core';
import { User } from "../../logic/types";
import { IconUser } from '@tabler/icons-react';


const defaultUser:User ={
    id_: '1',
    email: 'john.doe@example.com',
    first_name: 'John',
    surname: 'Doe',
    dob: '1990-01-01',
    postcode: '12345',
    created_at: '2023-01-01',
    roles: ['admin'],
  }

const UserInformation: React.FC = () => {
    const { data = defaultUser } = useQuery({queryFn: getSelfUser, queryKey: ["user"]})
    const user = data as User
    return (
        <Container size="sm" px="md" py="md">
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group style={{ marginBottom: 10 }}>
              <Group>
                <Avatar radius="xl" size="lg" color="blue">
                    <IconUser size={40} />
                </Avatar>
                <div>
                  <Title order={2}>{`${user.first_name} ${user.surname}`}</Title>
                  <Text c="dimmed">{user.email}</Text>
                </div>
              </Group>
            </Group>
    
            <Group align="flex-start">
              <Text>Date of Birth: {new Date(user.dob).toDateString()}</Text>
              <Text>Postcode: {user.postcode}</Text>
              <Text>Account Created: {new Date(user.created_at).toDateString()}</Text>
            </Group>
    
            <Group style={{ marginTop: 20 }}>
              {user.roles.map((role, index) => (
                <Badge key={index} color="blue" variant="light">
                  {role}
                </Badge>
              ))}
            </Group>
          </Card>
        </Container>
      );
    }

export default UserInformation;