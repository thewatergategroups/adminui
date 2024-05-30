import { Badge, Container, List, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getScopes } from "../../logic/api";
import { Scope } from "../../logic/types"

const Scopes: React.FC = () => {
    const { data = [] } = useQuery({ queryFn: getScopes, queryKey: ["scopes"] });
    const displayData = data as Scope[];

    return (
        <Container>
        <Title order={2}>{'Scopes'}</Title>
        <List>
            {displayData.map((scope, index) => (
                <List.Item key={index}>
                <Badge color="blue" variant="light">
                    {scope.id_}
                </Badge>
                </List.Item>
            ))}
        </List>
        </Container>
    );
};

export default Scopes;
