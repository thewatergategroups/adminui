import { ActionIcon, Button, MultiSelect, TextInput, rem } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { Fragment, useState } from "react";
import { handlePatchUser } from "../../logic/api";
import { Roles, User } from "../../logic/types";
import Drawer from "../shared/Drawer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format, parseISO } from "date-fns"
import { DateInput, DateValue } from "@mantine/dates";

interface EditUserProps {
    user: User;
}



export default function EditUser({ user }: EditUserProps) {
    const queryClient = useQueryClient();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [userData, setUserData] = useState<User>(user);
    const [hasAttempted, setHasAttempted] = useState(false);

    const { mutate: updateUser, isPending: isUpdatingUser } = useMutation({
        mutationFn: handlePatchUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Object.values(user).some((value) => !value)) setHasAttempted(true);
        else updateUser(userData as User);
        setIsDrawerOpen(false);
    };

    const handleChange = (name: keyof User, value: string | DateValue | Roles[]) => {
        if (value instanceof Date) {
            value = format(value,"yyyy-MM-dd")
        }
        setUserData({
            ...userData,
            [name]: value,
        });
    };



    return (
        <Fragment>
            <ActionIcon loading={isUpdatingUser} variant="subtle" color="blue" onClick={() => setIsDrawerOpen(true)}>
                <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </ActionIcon>
            <Drawer opened={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Edit User">
                <form onSubmit={handleSubmit}>
                    <TextInput label="Email" name="email" value={userData.email} onChange={(e) => handleChange("email", e.target.value)} required />
                    <TextInput label="First Name" name="first_name" value={userData.first_name} onChange={(e) => handleChange("first_name", e.target.value)} required />
                    <TextInput label="Surname" name="surname" value={userData.surname} onChange={(e) => handleChange("surname", e.target.value)} required />
                    <DateInput
                            label="Date of Birth"
                            placeholder="Date of Birth"
                            value={userData.dob ? parseISO(userData.dob) : undefined}
                            onChange={(value:DateValue)  => handleChange("dob", value)}
                            error={hasAttempted && !userData.dob}
                            valueFormat="YYYY-MM-DD"
                        />
                    <TextInput label="Postcode" name="postcode" value={userData.postcode} onChange={(e) => handleChange("postcode", e.target.value)} required />
                    <MultiSelect label="Roles" data={["admin", "standard", "readonly"]} value={userData.roles} onChange={(roles) => handleChange("roles",roles as Roles[])} />
                    <Button type="submit">Save Changes</Button>
                </form>
            </Drawer>
        </Fragment>
    );
}
