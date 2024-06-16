import { ActionIcon, Button, Select, TextInput,  JsonInput } from "@mantine/core";
import { IconUserPlus } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { handleCreateUpdateParameter } from "../../logic/api";
import { ParameterRequest, ParameterType } from "../../logic/types";
import Drawer from "../shared/Drawer";
import { prettifyJson } from "./Parameters";

export default function CreateClient() {
    const queryClient = useQueryClient();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [hasAttempted, setHasAttempted] = useState(false);

    const [parameter, setParameter] = useState<ParameterRequest>({
        name: "",
        description: "",
        type_: "SecureString",
        value: "{}"
    });

    const { mutate: createParameter, isPending: isCreatingParameter } = useMutation({
        mutationFn: handleCreateUpdateParameter,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["secrets"] });
            if (response !== null){
        }
        },
    });

    const handleChange = (name: keyof ParameterRequest, value: string ) => {
        setParameter({
            ...parameter,
            [name]: value,
        });
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Object.values(parameter).some((value) => !value)) setHasAttempted(true);
        else createParameter(parameter as ParameterRequest);
        setIsDrawerOpen(false);

    };

    return (
        <Fragment>
            <ActionIcon loading={isCreatingParameter} loaderProps={{ type: "dots" }} onClick={() => setIsDrawerOpen(true)}>
                <IconUserPlus />
            </ActionIcon>
            <Drawer opened={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Create Parameter">
                <form onSubmit={handleSubmit}>
                    <TextInput
                        label="Name"
                        name="name"
                        value={parameter.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        error={hasAttempted && !parameter.name}
                        required
                    />
                    <TextInput
                        label="Description"
                        name="description"
                        value={parameter.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        error={hasAttempted && !parameter.description}
                        required
                    />
                    <Select 
                    label="Type"
                    data={["SecureString" , "String" , "StringList"]} 
                    value={parameter.type_} 
                    onChange={(type) => handleChange("type_",type as ParameterType)} required/>
                    <JsonInput
                        label="Value"
                        name="value"
                        minRows={8}
                        autosize
                        formatOnBlur
                        validationError="Invalid JSON"
                        value={prettifyJson(parameter.value)}
                        onChange={(e) => handleChange("value", e)}
                        error={hasAttempted && !parameter.value}
                        required
                    />
                    <Button type="submit">Create Parameter</Button>
                </form>
            </Drawer>

        </Fragment>
    );
}
