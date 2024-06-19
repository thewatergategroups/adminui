import { ActionIcon, Button, TextInput,Text, rem, Select } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import React, {  Fragment, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { handleCreateUpdateDomain } from "../../logic/api";
import {  DomainRequest, DomainType } from "../../logic/types";
import Drawer from "../shared/Drawer";


interface EditDomainProps {
    domain: DomainRequest;
}

const EditDomain: React.FC<EditDomainProps> = ({ domain }) => {
    const queryClient = useQueryClient();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [domainData, setDomainData] = useState<DomainRequest>(domain);
   
    
    const { mutate: updateDomain, isPending: isUpdatingDomain } = useMutation({
        mutationFn: handleCreateUpdateDomain,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["domains"] });
        },
    });


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateDomain(domainData as DomainRequest);
        setIsDrawerOpen(false);
    };

    const handleChange = (name: keyof DomainRequest, value: string) => {
        setDomainData({
            ...domainData,
            [name]: value,
        });
    };
    return (
        <Fragment>
            <ActionIcon loading={isUpdatingDomain} variant="subtle" color="blue" onClick={() => setIsDrawerOpen(true)}>
                <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </ActionIcon>
            <Drawer
                opened={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                title="Edit Domain"
                padding="md"
                size="md"
                position="right"
            >
                <form onSubmit={handleSubmit}>

                    <Text>Name: {domainData.name}</Text>
                    <Select label="Type" data={["CNAME"]} value={domainData.type_} onChange={(type) => handleChange("type_",type as DomainType)} required/>
                    <TextInput
                        label="TTL"
                        name="ttl"
                        value={domainData.ttl}
                        onChange={(e) => handleChange("ttl", e.target.value)}
                    />
                    <Button type="submit">Save Changes</Button>
                </form>
            </Drawer>
        </Fragment>
    );
};

export default EditDomain;
