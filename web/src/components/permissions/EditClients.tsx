import { ActionIcon, Button, Drawer, MultiSelect, TextInput,Text, rem } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import React, { ChangeEvent, Fragment, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { patchClient } from "../../logic/api";
import { Client } from "../../logic/types";

const StyledDrawer = styled(Drawer)`
    .mantine-Drawer-inner {
        right: 0;
    }
`;

interface EditClientProps {
    client: Client;
}

const EditClient: React.FC<EditClientProps> = ({ client }) => {
    const queryClient = useQueryClient();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [clientData, setClientData] = useState<Client>(client);
    
    const { mutate: updateClient, isPending: isUpdatingClient } = useMutation({
        mutationFn: patchClient,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clients"] });
        },
    });


    const handleSubmit = async () => {
        await updateClient(clientData);
        setIsDrawerOpen(false);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setClientData({ ...clientData, [name]: value });
    };

    const handleRolesChange = (roles: string[]) => {
        setClientData({ ...clientData, roles });
    };
    const handleRedirectUrisChange = (redirect_uris: string[]) => {
        setClientData({ ...clientData, redirect_uris });
      };
    
      const handleGrantTypesChange = (grant_types: string[]) => {
        setClientData({ ...clientData, grant_types });
      };
    return (
        <Fragment>
            <ActionIcon loading={isUpdatingClient} variant="subtle" color="blue" onClick={() => setIsDrawerOpen(true)}>
                <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </ActionIcon>
            <StyledDrawer
                opened={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                title="Edit Client"
                padding="md"
                size="md"
                position="right"
            >
                <Text>ID:    {clientData.id_}</Text>
                <TextInput label="Name" name="name" value={clientData.name} onChange={handleInputChange} required />
                <TextInput label="Description" name="description" value={clientData.description} onChange={handleInputChange} required />
                <TextInput label="Type" name="type" value={clientData.type} onChange={handleInputChange} required />
                <MultiSelect label="Roles" data={["admin", "standard", "readonly"]} value={clientData.roles} onChange={handleRolesChange} />
                <MultiSelect label="Grant Types" data={['authorization_code', 'implicit',  'refresh_token']} value={clientData.grant_types} onChange={handleGrantTypesChange} />  // 'password', 'client_credentials',
                <MultiSelect label="Redirect URIs" data={clientData.redirect_uris} value={clientData.redirect_uris} onChange={handleRedirectUrisChange} />
                <Button onClick={handleSubmit}>Save Changes</Button>
            </StyledDrawer>
        </Fragment>
    );
};

export default EditClient;
