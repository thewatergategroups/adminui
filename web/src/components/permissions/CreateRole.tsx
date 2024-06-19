import {  ActionIcon, Button, TagsInput, TextInput } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  handleCreateRole } from "../../logic/api";
import { Role } from "../../logic/types";
import { IconUserPlus } from "@tabler/icons-react";
import { Fragment, useState } from "react";
import Drawer from "../shared/Drawer";

interface RoleInput extends Partial<Role>{}

const Roles: React.FC = () => {
    const queryClient = useQueryClient();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [hasAttempted, setHasAttempted] = useState(false);

    const [role, setRole] = useState<RoleInput>({
        id_: "",
        scopes: undefined
    })

    const { mutate: createRole, isPending: isCreatingRole } = useMutation({
        mutationFn: handleCreateRole,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["roles"] });
        },
    });

    const handleChange = (name: keyof Role, value: string | string[] ) => {
        setRole({
            ...role,
            [name]: value,
        });
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Object.values(role).some((value) => !value)) setHasAttempted(true);
        else createRole(role as Role);
        setIsDrawerOpen(false);
    };
    return (
        <Fragment>
            <ActionIcon loading={isCreatingRole} loaderProps={{ type: "dots" }} onClick={() => setIsDrawerOpen(true)}>
                <IconUserPlus />
            </ActionIcon>
            <Drawer opened={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Create Role">
                <form onSubmit={handleSubmit}>
                    <TextInput
                        label="ID"
                        name="id_"
                        value={role.id_}
                        onChange={(e) => handleChange("id_", e.target.value)}
                        error={hasAttempted && !role.id_}
                        required
                    />
                    <TagsInput label="Scopes" placeholder="Enter Scope ID" value={role.scopes} onChange={(scopes) => handleChange("scopes", scopes )} required />
                    <Button type="submit">Create Role</Button>
                </form>
            </Drawer>
        </Fragment>
    );
};

export default Roles;
