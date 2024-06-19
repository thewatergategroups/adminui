import {  ActionIcon, Group, Paper, Table, Text, rem } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { handleGetDomains, handleDeleteDomain } from "../../logic/api";
import { Domain, DomainRequest } from "../../logic/types";
import { IconTrash } from "@tabler/icons-react";
import EditDomain from "./EditDomains";
import CreateDomain from "./CreateDomains";

function convertDomainToRequest(domain: Domain): DomainRequest {
    return {
        name: domain.Name,
        type_: domain.Type,
        ttl: domain.TTL
    };
}


const Domains: React.FC = () => {
    const queryClient = useQueryClient();
    const { data = [] } = useQuery({ queryFn: handleGetDomains, queryKey: ["domains"] });
    
    const { mutate: deleteDomain } = useMutation({
        mutationFn: handleDeleteDomain,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["domains"] });
        },
    });
    
    const displayData = data as Domain[];
    const rows = displayData.map((item) => (
        <Table.Tr key={item.Name}>
            <Table.Td>
                <Text fz="sm" fw={500}>
                    {item.Name}
                </Text>
            </Table.Td>
            <Table.Td>
                <Text fz="sm" fw={500}>
                    {item.Type}
                </Text>
            </Table.Td>
            <Table.Td>
                <Text fz="sm" fw={500}>
                    {item.TTL}
                </Text>
            </Table.Td>
            <Table.Td>
                <Group gap={0} justify="flex-end">
                {item.Type === 'CNAME' && (
                    <>
                    <EditDomain domain={convertDomainToRequest(item)} />
                    <ActionIcon onClick={() => deleteDomain(item)} variant="subtle" color="red">
                        <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </ActionIcon>
                    </>
                )}
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Paper withBorder p="md" radius="md" key="Domains">
        <div className="table-controls">
            <CreateDomain />
        </div>
        <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="md" highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Type</Table.Th>
                        <Table.Th>TTL</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
        </Paper>

    );
};

export default Domains;
