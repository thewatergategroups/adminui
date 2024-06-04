import { ActionIcon, Button, MultiSelect, TextInput, rem } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { ChangeEvent, Fragment, useState } from "react";
import { patchUser } from "../../logic/api";
import { User } from "../../logic/types";
import Drawer from "../shared/Drawer";

interface EditUserProps {
    user: User;
}

export default function EditUser({ user }: EditUserProps) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [userData, setUserData] = useState<User>(user);

    const handleSubmit = async () => {
        await patchUser(userData);
        setIsDrawerOpen(false);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleRolesChange = (roles: string[]) => {
        setUserData({ ...userData, roles });
    };

    return (
        <Fragment>
            <ActionIcon variant="subtle" color="blue" onClick={() => setIsDrawerOpen(true)}>
                <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </ActionIcon>
            <Drawer opened={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Edit User">
                <TextInput label="Email" name="email" value={userData.email} onChange={handleInputChange} required />
                <TextInput label="First Name" name="first_name" value={userData.first_name} onChange={handleInputChange} required />
                <TextInput label="Surname" name="surname" value={userData.surname} onChange={handleInputChange} required />
                <TextInput label="Date of Birth" name="dob" value={userData.dob} onChange={handleInputChange} required />
                <TextInput label="Postcode" name="postcode" value={userData.postcode} onChange={handleInputChange} required />
                <MultiSelect label="Roles" data={["admin", "standard", "readonly"]} value={userData.roles} onChange={handleRolesChange} />
                <Button onClick={handleSubmit}>Save Changes</Button>
            </Drawer>
        </Fragment>
    );
}
