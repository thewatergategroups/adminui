import { ActionIcon, Badge, Card, Group, Paper, Text, rem } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { handleDeleteRole, handleGetRoles } from "../../logic/api";
import { Role } from "../../logic/types";
import CreateRole from "./CreateRole"
import EditRole from "./EditRole";
import { IconTrash } from "@tabler/icons-react";
import ConfirmDeleteModal from "../shared/ConfirmDeleteModal";
import { useState } from "react";


const Roles: React.FC = () => {
    const queryClient = useQueryClient();

    const { data = [] } = useQuery({ queryFn: handleGetRoles, queryKey: ["roles"] });
    const displayData = data as Role[];

    const [modalOpened, setModalOpened] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    
    const handleDeleteClick = (item: Role) => {
        setSelectedRole(item);
        setModalOpened(true);
      };
    
      const confirmDelete = () => {
        if (selectedRole) {
          deleteRole(selectedRole);
        }
        setModalOpened(false);
      };

    const { mutate: deleteRole } = useMutation({
        mutationFn: handleDeleteRole,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["roles"] });
            },
            });
    return (
        <Paper withBorder p="md" radius="md" key="Roles">
        <div className="table-controls">
            <CreateRole />
        </div>
        <Group style={{ marginTop: 20 }}>
            {displayData?.map((role) => (
                <Card key={role.id_} padding="md" radius="md" withBorder style={{ width: "500px", height: "150px" }}>
                    <div  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>{role.id_}</Text>
                        <Group>
                        <EditRole role={role} />
                        <ActionIcon onClick={()=> {handleDeleteClick(role)}} variant="subtle" color="red">
                                <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                        </ActionIcon>
                        </Group>
                    </div>
                    <Group mt="xs">
                        {role?.scopes?.map((scope, index) => (
                            <Badge key={index} color="blue" variant="light">
                                {scope}
                            </Badge>
                        ))}
                    </Group>
                </Card>
            ))}
        </Group>
        <ConfirmDeleteModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        onConfirm={confirmDelete}
        />
        </Paper>
    );
};

export default Roles;
