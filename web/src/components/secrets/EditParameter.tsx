import { ActionIcon, Button, TextInput,Text, rem, Select, JsonInput } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import React, {  Fragment, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { handleCreateUpdateParameter } from "../../logic/api";
import {  ParameterRequest, ParameterType } from "../../logic/types";
import Drawer from "../shared/Drawer";
import { prettifyJson } from "./Parameters";


interface EditParameterProps {
    parameter: ParameterRequest;
}

const EditParameter: React.FC<EditParameterProps> = ({ parameter }) => {
    const queryClient = useQueryClient();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [parameterData, setParameterData] = useState<ParameterRequest>(parameter);
   
    
    const { mutate: updateParameter, isPending: isUpdatingParameter } = useMutation({
        mutationFn: handleCreateUpdateParameter,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["secrets"] });
        },
    });


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateParameter(parameterData as ParameterRequest);
        setIsDrawerOpen(false);
    };

    const handleChange = (name: keyof ParameterRequest, value: string) => {
        setParameterData({
            ...parameterData,
            [name]: value,
        });
    };
    return (
        <Fragment>
            <ActionIcon loading={isUpdatingParameter} variant="subtle" color="blue" onClick={() => setIsDrawerOpen(true)}>
                <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </ActionIcon>
            <Drawer
                opened={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                title="Edit Parameter"
                padding="md"
                size="md"
                position="right"
            >
                <form onSubmit={handleSubmit}>

                    <Text>Name: {parameterData.name}</Text>
                    <TextInput label="Description" name="description" value={parameterData.description} onChange={(e) => handleChange("description", e.target.value)} />
                    <Select label="Type" data={["SecureString" , "String" , "StringList"]} value={parameterData.type_} onChange={(type) => handleChange("type_",type as ParameterType)} required/>
                    <JsonInput
                        label="Value"
                        name="value"
                        autosize
                        formatOnBlur
                        validationError="Invalid JSON"
                        minRows={8}
                        value={prettifyJson(parameterData.value)}
                        onChange={(value) => handleChange("value", value)}
                    />
                    <Button type="submit">Save Changes</Button>
                </form>
            </Drawer>
        </Fragment>
    );
};

export default EditParameter;
