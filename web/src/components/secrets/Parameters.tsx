import {  ActionIcon, Avatar, Group, JsonInput, Paper, Table, Text, rem } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { handleGetParameters, handleDeleteParameter } from "../../logic/api";
import { Parameter, ParameterRequest } from "../../logic/types";
import { IconTrash, IconUser } from "@tabler/icons-react";
import EditParameter from "./EditParameter";
import CreateClient from "./CreateParameter";

function convertParameterToRequest(parameter: Parameter): ParameterRequest {
    return {
        name: parameter.Name,
        description: parameter.Description,
        type_: parameter.Type,
        value: parameter.Value
    };
}

export function prettifyJson(value: string):string{
    return JSON.stringify(JSON.parse(value),null,2)
}

const Parameters: React.FC = () => {
    const queryClient = useQueryClient();
    const { data = [] } = useQuery({ queryFn: handleGetParameters, queryKey: ["secrets"] });
    
    const { mutate: deleteParameter } = useMutation({
        mutationFn: handleDeleteParameter,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["secrets"] });
        },
    });
    
    const displayData = data as Parameter[];
    const rows = displayData.map((item) => (
        <Table.Tr key={item.Name}>
                        
            <Table.Td>
                <Avatar radius="xl" size="lg" color="blue">
                    <IconUser size={40} />
                </Avatar>
            </Table.Td>
            <Table.Td>
            <Group gap="sm">
                    <div>
                        <Text fz="sm" fw={500}>
                            {item.Name}
                        </Text>
                        <Text fz="xs" c="dimmed">
                            {item.Description}
                        </Text>
                    </div>
                </Group>
            </Table.Td>
            <Table.Td>
                <Text fz="sm" fw={500}>
                    {item.Type}
                </Text>
            </Table.Td>
            <Table.Td>
                <JsonInput value={prettifyJson(item.Value)}
                disabled
                formatOnBlur
                autosize
                maxRows={8}
                fz="xl" fw={500}>
                </JsonInput>
            </Table.Td>
            <Table.Td>
            <Text fz="sm" fw={500}>
                {item.Version}
            </Text>
            </Table.Td>
            <Table.Td>
                <Text fz="sm" fw={500}>
                    {new Date(item.LastModifiedDate).toDateString()}
                </Text>
            </Table.Td>
            <Table.Td>
                <Group gap={0} justify="flex-end">
                    <EditParameter parameter={convertParameterToRequest(item)} />
                    <ActionIcon onClick={()=> {deleteParameter(item)}} variant="subtle" color="red">
                        <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Paper withBorder p="md" radius="md" key="Parameters">
        <div className="table-controls">
            <CreateClient />
        </div>
        <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="md" highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th></Table.Th>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Type</Table.Th>
                        <Table.Th>Value</Table.Th>
                        <Table.Th>Version</Table.Th>
                        <Table.Th>Last Modified</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
        </Paper>

    );
};

export default Parameters;
