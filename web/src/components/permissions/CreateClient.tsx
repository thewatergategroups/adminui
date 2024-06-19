import { ActionIcon, Button, MultiSelect, Select, TagsInput, TextInput, Text } from "@mantine/core";
import { IconUserPlus } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { handleCreateClient } from "../../logic/api";
import { ClientRequest,Roles,GrantTypes,ClientType, ClientCreateResponse } from "../../logic/types";
import Drawer from "../shared/Drawer";
interface ClientInputs extends Partial<ClientRequest> {}

export default function CreateClient() {
    const queryClient = useQueryClient();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [hasAttempted, setHasAttempted] = useState(false);
    const [responseMessage, setResponseMessage] = useState<ClientCreateResponse | null>(null);
    const [isConfirmDrawerOpen, setIsConfirmDrawerOpen] = useState(false);

    const [client, setClient] = useState<ClientInputs>({
        name: "",
        description: "",
        type: "confidential",
        grant_types:["authorization_code"],
        redirect_uris: [],
        roles: ["readonly"]
    });

    const { mutate: createClient, isPending: isCreatingClient } = useMutation({
        mutationFn: handleCreateClient,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["clients"] });
            if (response !== null){
                setResponseMessage(response);
                setIsConfirmDrawerOpen(true);
        }
        },
    });

    const handleChange = (name: keyof ClientRequest, value: string | ClientType | string[] | Roles[] | GrantTypes[]) => {
        setClient({
            ...client,
            [name]: value,
        });
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Object.values(client).some((value) => !value)) setHasAttempted(true);
        else createClient(client as ClientRequest);
        setIsDrawerOpen(false)
    };

    return (
        <Fragment>
            <ActionIcon loading={isCreatingClient} loaderProps={{ type: "dots" }} onClick={() => setIsDrawerOpen(true)}>
                <IconUserPlus />
            </ActionIcon>
            <Drawer opened={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Create Client">
                <form onSubmit={handleSubmit}>
                    <TextInput
                        label="Name"
                        name="name"
                        value={client.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        error={hasAttempted && !client.name}
                        required
                    />
                    <TextInput
                        label="Description"
                        name="description"
                        value={client.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        error={hasAttempted && !client.description}
                        required
                    />
                    <Select label="Type" data={["confidential"]} value={client.type} onChange={(type) => handleChange("type",type as ClientType)} required/>
                    <TagsInput label="Redirect URI's" placeholder="Enter URI" value={client.redirect_uris} onChange={(redirect_uris) => handleChange("redirect_uris", redirect_uris )} required />
                    <MultiSelect label="Grant Types" data={["authorization_code", "implicit", "refresh_token"]} value={client.grant_types} onChange={(grant_types) => handleChange("grant_types",grant_types as GrantTypes[])} required/>
                    
                    <MultiSelect label="Roles" data={["admin", "standard", "readonly"]} value={client.roles} onChange={(roles) => handleChange("roles",roles as Roles[])} required />
                    <Button type="submit">Create Client</Button>
                </form>
            </Drawer>
            <Drawer
                opened={isConfirmDrawerOpen}
                onClose={() => setIsConfirmDrawerOpen(false)}
                title="Client Created Successfully"
            >
                {responseMessage && (
                <div>
                    <Text>Please keep these in a safe place. They will no longer be accessible after closing this window.
                        
                    </Text>
                    <Text>
                        <strong>Client ID:</strong> {responseMessage.client_id}
                    </Text>
                    <Text>
                        <strong>Client Secret:</strong> {responseMessage.client_secret}
                    </Text>
                </div>
                )}
                <Button onClick={() => {
                        setIsConfirmDrawerOpen(false)
                        setIsDrawerOpen(false)
                    }
                }>Continue</Button>
            </Drawer>
        </Fragment>
    );
}
