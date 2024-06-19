import { ActionIcon, Button, Select, TextInput } from "@mantine/core";
import { IconUserPlus } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { handleCreateUpdateDomain } from "../../logic/api";
import { DomainRequest, DomainType } from "../../logic/types";
import Drawer from "../shared/Drawer";

export default function CreateDomain() {
    const queryClient = useQueryClient();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [hasAttempted, setHasAttempted] = useState(false);

    const [domain, setDomain] = useState<DomainRequest>({
        name: "",
        type_: "CNAME",
        ttl: 300
    });

    const { mutate: createDomain, isPending: isCreatingDomain } = useMutation({
        mutationFn: handleCreateUpdateDomain,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["domains"] });
            if (response !== null){
        }
        },
    });

    const handleChange = (name: keyof DomainRequest, value: string ) => {
        setDomain({
            ...domain,
            [name]: value,
        });
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Object.values(domain).some((value) => !value)) setHasAttempted(true);
        else createDomain(domain as DomainRequest);
        setIsDrawerOpen(false);

    };

    return (
        <Fragment>
            <ActionIcon loading={isCreatingDomain} loaderProps={{ type: "dots" }} onClick={() => setIsDrawerOpen(true)}>
                <IconUserPlus />
            </ActionIcon>
            <Drawer opened={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Create Domain">
                <form onSubmit={handleSubmit}>
                    <TextInput
                        label="Name"
                        name="name"
                        value={domain.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        error={hasAttempted && !domain.name}
                        required
                    />
                    <Select label="Type" data={["CNAME"]} value={domain.type_} onChange={(type) => handleChange("type_",type as DomainType)} required/>
                    <TextInput
                        label="TTL"
                        name="ttl"
                        value={domain.ttl}
                        onChange={(e) => handleChange("ttl", e.target.value)}
                        required
                    />
                    <Button type="submit">Create Domain</Button>
                </form>
            </Drawer>

        </Fragment>
    );
}
