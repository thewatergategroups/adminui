import { ActionIcon, Button, TextInput } from "@mantine/core";
import { IconUserPlus } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { handleCreateUser } from "../../logic/api";
import { UserRequest } from "../../logic/types";
import Drawer from "../shared/Drawer";

export default function CreateUser() {
    const queryClient = useQueryClient();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const [user, setUser] = useState<UserRequest>({
        alg: undefined,
        email: "",
        first_name: "",
        surname: "",
        dob: "",
        postcode: "",
        password: "",
    });

    const { mutate: createUser, isPending: isCreatingUser } = useMutation({
        mutationFn: handleCreateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createUser(user);
    };

    return (
        <Fragment>
            <ActionIcon loading={isCreatingUser} loaderProps={{ type: "dots" }} onClick={() => setIsDrawerOpen(true)}>
                <IconUserPlus />
            </ActionIcon>
            <Drawer opened={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Create User">
                <form onSubmit={handleSubmit}>
                    <TextInput label="Alg" name="alg" value={user.alg} onChange={handleChange} />
                    <TextInput label="Email" name="email" value={user.email} onChange={handleChange} />
                    <TextInput label="First Name" name="first_name" value={user.first_name} onChange={handleChange} />
                    <TextInput label="Surname" name="surname" value={user.surname} onChange={handleChange} />
                    <TextInput label="DOB" name="dob" value={user.dob} onChange={handleChange} />
                    <TextInput label="Postcode" name="postcode" value={user.postcode} onChange={handleChange} />
                    <TextInput label="Password" name="password" value={user.password} onChange={handleChange} type="password" />
                    <Button type="submit">Create User</Button>
                </form>
            </Drawer>
        </Fragment>
    );
}
