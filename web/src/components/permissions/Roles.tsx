import { Badge,Card,Text,Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getRoles } from "../../logic/api";
import { Role } from "../../logic/types"

const Roles: React.FC = () => {
    const { data = [] } = useQuery({ queryFn: getRoles, queryKey: ["roles"] });
    const displayData = data as Role[];

    return (
        <Group style={{ marginTop: 20 }}>
      {displayData.map((role) => (
        <Card key={role.id_} shadow="sm" padding="md" radius="md" withBorder style={{ width: '600px' }}>
          <Text>{role.id_}</Text>
          <Group mt="xs">
            {role.scopes.map((scope, index) => (
              <Badge key={index} color="blue" variant="light">
                {scope}
              </Badge>
            ))}
          </Group>
        </Card>
      ))}
    </Group>
    );
};

export default Roles;
