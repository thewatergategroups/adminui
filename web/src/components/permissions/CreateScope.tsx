import {  ActionIcon, Button, TextInput } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  handleCreateScopes } from "../../logic/api";
import { Scope } from "../../logic/types";
import { IconUserPlus } from "@tabler/icons-react";
import { Fragment, useState } from "react";
import Drawer from "../shared/Drawer";

interface ScopeInput extends Partial<Scope>{}

const Scopes: React.FC = () => {
    const queryClient = useQueryClient();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [hasAttempted, setHasAttempted] = useState(false);

    const [scope, setScope] = useState<ScopeInput>({
        id_: ""
    })

    const { mutate: createScope, isPending: isCreatingScope } = useMutation({
        mutationFn: handleCreateScopes,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["scopes"] });
        },
    });

    const handleChange = (name: keyof Scope, value: string ) => {
        setScope({
            ...scope,
            [name]: value,
        });
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Object.values(scope).some((value) => !value)) setHasAttempted(true);
        else createScope(scope as Scope);
        setIsDrawerOpen(false);
    };
    return (
        <Fragment>
            <ActionIcon loading={isCreatingScope} loaderProps={{ type: "dots" }} onClick={() => setIsDrawerOpen(true)}>
                <IconUserPlus />
            </ActionIcon>
            <Drawer opened={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Create Scope">
                <form onSubmit={handleSubmit}>
                    <TextInput
                        label="ID"
                        name="id_"
                        value={scope.id_}
                        onChange={(e) => handleChange("id_", e.target.value)}
                        error={hasAttempted && !scope.id_}
                        required
                    />
                    <Button type="submit">Create Scope</Button>
                </form>
            </Drawer>
        </Fragment>
    );
};

export default Scopes;
