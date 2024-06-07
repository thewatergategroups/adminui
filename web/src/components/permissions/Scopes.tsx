import {  ActionIcon, Card, Group, Paper, Title,rem } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { handleGetScopes, handleDeleteScope } from "../../logic/api";
import { Scope } from "../../logic/types";
import { IconTrash } from "@tabler/icons-react";
import CreateScope from "./CreateScope";

const Scopes: React.FC = () => {
    const queryClient = useQueryClient();
    const { data = [] } = useQuery({ queryFn: handleGetScopes, queryKey: ["scopes"] });
    
    const { mutate: deleteScope } = useMutation({
        mutationFn: handleDeleteScope,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["scopes"] });
            },
            });

    const displayData = data as Scope[];
    
    return (
        <Paper withBorder p="md" radius="md" key="Scopes">
        <div className="table-controls">
            <CreateScope />
        </div>
        <Title order={2}>{"Scopes"}</Title>
        <Group style={{ marginTop: 20 }}>
            {displayData.map((scope, index) => (
            <Card key={index}  padding="md" radius="md" withBorder style={{ width: "150px" }}>
                <div  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>{scope.id_}</div>
                <ActionIcon onClick={()=> {deleteScope(scope)}} variant="subtle" color="red">
                        <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                </ActionIcon>
                </div>
            </Card>
                ))}
        </Group>
        </Paper>
    );
};

export default Scopes;
