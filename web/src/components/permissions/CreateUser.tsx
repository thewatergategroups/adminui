import { ActionIcon, Button, Select, TextInput } from "@mantine/core";
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
    const [hasAttempted, setHasAttempted] = useState(false);

    const [user, setUser] = useState<UserRequest>({
        alg: "ES256",
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
        if (Object.values(user).some((value) => !value)) setHasAttempted(true);
        else createUser(user);
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
                        onChange={(value: string | null) =>
                            handleChange({ target: { name: "alg", value: value as string } } as React.ChangeEvent<HTMLInputElement>)
                        }
                        data={["ES256", "RS256"]}
                        allowDeselect={false}
                    />
                    <TextInput label="Email" name="email" value={user.email} onChange={handleChange} error={hasAttempted && !user.email} />
                    <TextInput
                        label="First Name"
                        name="first_name"
                        value={user.first_name}
                        onChange={handleChange}
                        error={hasAttempted && !user.first_name}
                    />
                    <TextInput
                        label="Surname"
                        name="surname"
                        value={user.surname}
                        onChange={handleChange}
                        error={hasAttempted && !user.surname}
                    />
                    <TextInput label="DOB" name="dob" value={user.dob} onChange={handleChange} error={hasAttempted && !user.dob} />
                    <TextInput
                        label="Postcode"
                        name="postcode"
                        value={user.postcode}
                        onChange={handleChange}
                        error={hasAttempted && !user.postcode}
                    />
                    <TextInput
                        label="Password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        type="password"
                        error={hasAttempted && !user.password}
                    />
                    <Button type="submit">Create User</Button>
                </form>
            </Drawer>
        </Fragment>
    );
}
