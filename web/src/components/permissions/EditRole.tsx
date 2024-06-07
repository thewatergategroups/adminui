import { ActionIcon, Text, rem, TagsInput, Button } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import React, {  Fragment, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handlePatchRole } from "../../logic/api";
import { Role } from "../../logic/types";
import Drawer from "../shared/Drawer";



interface EditRoleProps {
    role: Role;
}

const EditRole: React.FC<EditRoleProps> = ({ role }) => {
    const queryClient = useQueryClient();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [roleData, setRoleData] = useState<Role>(role);
    
    const { mutate: updateRole, isPending: isUpdatingRole } = useMutation({
        mutationFn: handlePatchRole,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["roles"] });
        },
    });


    const handleSubmit = async () => {
        await updateRole(roleData);
        setIsDrawerOpen(false);
    };

    const handleChange = (name: keyof Role, value: string | string[]) => {
        setRoleData({
            ...roleData,
            [name]: value,
        });
    };


    return (
        <Fragment>
            <ActionIcon loading={isUpdatingRole} variant="subtle" color="blue" onClick={() => setIsDrawerOpen(true)}>
                <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </ActionIcon>
            <Drawer
                opened={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                title="Edit Role"
                padding="md"
                size="md"
                position="right"
            >
                <form onSubmit={handleSubmit}>
                <Text>ID {role.id_}</Text>
                <TagsInput label="Scopes" placeholder="Enter Scope ID" value={roleData.scopes} onChange={(scopes) => handleChange("scopes", scopes )} required />
                <Button type="submit">Save Changes</Button>
                </form>
            </Drawer>
        </Fragment>
    );
};

export default EditRole;
