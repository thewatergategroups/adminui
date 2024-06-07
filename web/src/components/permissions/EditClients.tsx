import { ActionIcon, Button, MultiSelect, TextInput,Text, rem, TagsInput } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import React, {  Fragment, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { handlePatchClient } from "../../logic/api";
import { Client, GrantTypes, Roles } from "../../logic/types";
import Drawer from "../shared/Drawer";


interface EditClientProps {
    client: Client;
}

const EditClient: React.FC<EditClientProps> = ({ client }) => {
    const queryClient = useQueryClient();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [clientData, setClientData] = useState<Client>(client);
    const [hasAttempted, setHasAttempted] = useState(false);
   
    
    const { mutate: updateClient, isPending: isUpdatingClient } = useMutation({
        mutationFn: handlePatchClient,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clients"] });
        },
    });


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Object.values(client).some((value) => !value)) setHasAttempted(true);
        else updateClient(clientData as Client);
        setIsDrawerOpen(false);
    };

    const handleChange = (name: keyof Client, value: string | GrantTypes[] | Roles[] | string[]) => {
        setClientData({
            ...clientData,
            [name]: value,
        });
    };
    return (
        <Fragment>
            <ActionIcon loading={isUpdatingClient} variant="subtle" color="blue" onClick={() => setIsDrawerOpen(true)}>
                <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </ActionIcon>
            <Drawer
                opened={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                title="Edit Client"
                padding="md"
                size="md"
                position="right"
            >
                <form onSubmit={handleSubmit}>

                    <Text>ID:    {clientData.id_}</Text>
                    <TextInput label="Name" name="name" value={clientData.name} onChange={(e) => handleChange("name", e.target.value)} />
                    <TextInput label="Description" name="description" value={clientData.description} onChange={(e) => handleChange("description", e.target.value)} />
                    <TextInput label="Type" name="type" value={clientData.type} onChange={(e) => handleChange("type", e.target.value)} />
                    <MultiSelect label="Roles" data={["admin", "standard", "readonly"]} value={clientData.roles} onChange={(roles) => handleChange("roles", roles as Roles[])} />
                    <MultiSelect label="Grant Types" data={['authorization_code', 'implicit',  'refresh_token']} value={clientData.grant_types} onChange={(grant_types) => handleChange("grant_types", grant_types as GrantTypes[])} error={hasAttempted && !clientData.grant_types} />
                    <TagsInput label="Redirect URI's" placeholder="Enter URI" value={clientData.redirect_uris} onChange={(redirect_uris) => handleChange("redirect_uris", redirect_uris)} />
                    <Button type="submit">Save Changes</Button>
                </form>
            </Drawer>
        </Fragment>
    );
};

export default EditClient;
