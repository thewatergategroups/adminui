import { ActionIcon, Button, MultiSelect, Select, TextInput } from "@mantine/core";
import { DateInput, DateValue } from "@mantine/dates";
import { IconUserPlus } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { handleCreateUser } from "../../logic/api";
import { Roles, UserRequest } from "../../logic/types";
import Drawer from "../shared/Drawer";
import { format, parseISO } from "date-fns"
interface UserInputs extends Partial<UserRequest> {}

export default function CreateUser() {
    const queryClient = useQueryClient();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [hasAttempted, setHasAttempted] = useState(false);

    const [user, setUser] = useState<UserInputs>({
        alg: "ES256",
        email: "",
        first_name: "",
        surname: "",
        dob: undefined,
        postcode: "",
        password: "",
        roles: undefined
    });

    const { mutate: createUser, isPending: isCreatingUser } = useMutation({
        mutationFn: handleCreateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });

    const handleChange = (name: keyof UserRequest, value: string | DateValue | Roles[]) => {
        if (value instanceof Date) {
            value = format(value,"yyyy-MM-dd")
        }
        setUser({
            ...user,
            [name]: value,
        });
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Object.values(user).some((value) => !value)) setHasAttempted(true);
        else createUser(user as UserRequest);
        setIsDrawerOpen(false);
    };

    return (
        <Fragment>
            <ActionIcon loading={isCreatingUser} loaderProps={{ type: "dots" }} onClick={() => setIsDrawerOpen(true)}>
                <IconUserPlus />
            </ActionIcon>
            <Drawer opened={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Create User">
                <form onSubmit={handleSubmit}>
                    <Select
                        label="Alg"
                        name="alg"
                        value={user.alg}
                        onChange={(value: string | null) => handleChange("alg", value as string)}
                        data={["ES256", "RS256"]}
                        allowDeselect={false}
                    />
                    <TextInput
                        label="Email"
                        name="email"
                        value={user.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        error={hasAttempted && !user.email}
                        type="email"
                    />
                    <TextInput
                        label="First Name"
                        name="first_name"
                        value={user.first_name}
                        onChange={(e) => handleChange("first_name", e.target.value)}
                        error={hasAttempted && !user.first_name}
                    />
                    <TextInput
                        label="Surname"
                        name="surname"
                        value={user.surname}
                        onChange={(e) => handleChange("surname", e.target.value)}
                        error={hasAttempted && !user.surname}
                    />
                    <DateInput
                        label="Date of Birth"
                        placeholder="Date of Birth"
                        value={user.dob ? parseISO(user.dob) : undefined}
                        onChange={(value:DateValue) => handleChange("dob", value)}
                        error={hasAttempted && !user.dob}
                        valueFormat="YYYY-MM-DD"
                    />
                    <TextInput
                        label="Postcode"
                        name="postcode"
                        value={user.postcode}
                        onChange={(e) => handleChange("postcode", e.target.value)}
                        error={hasAttempted && !user.postcode}
                    />
                    <TextInput
                        label="Password"
                        name="password"
                        value={user.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                        type="password"
                        error={hasAttempted && !user.password}
                    />
                    <MultiSelect label="Roles" data={["admin", "standard", "readonly"]} value={user.roles} onChange={(roles) => handleChange("roles",roles as Roles[])} />
                    <Button type="submit">Create User</Button>
                </form>
            </Drawer>
        </Fragment>
    );
}
