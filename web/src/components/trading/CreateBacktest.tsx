import { ActionIcon, Button, JsonInput, MultiSelect, TagsInput, TextInput } from "@mantine/core";
import { IconUserPlus } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { handleCreateBacktest } from "../../logic/api";
import { BacktestRequest, Strategy } from "../../logic/types";
import Drawer from "../shared/Drawer";
import { prettifyJson } from "../secrets/Parameters";
interface BacktestInputs extends Partial<BacktestRequest> {}

export default function CreateBacktest() {
    const queryClient = useQueryClient();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [hasAttempted, setHasAttempted] = useState(false);

    const [backtest, setBacktest] = useState<BacktestInputs>({
        symbols: [],
        strategy_aliases: undefined,
        strategy_definitions: undefined,
        days_to_test_over: 30,
    });

    const { mutate: createBacktest, isPending: isCreatingBacktest } = useMutation({
        mutationFn: handleCreateBacktest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["backtests"] });
        },
    });

    const handleChange = (name: keyof BacktestRequest, value: string | string[] | Strategy[] ) => {
        setBacktest({
            ...backtest,
            [name]: value,
        });
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createBacktest(backtest as BacktestRequest);
        setIsDrawerOpen(false);
    };

    return (
        <Fragment>
            <ActionIcon loading={isCreatingBacktest} loaderProps={{ type: "dots" }} onClick={() => setIsDrawerOpen(true)}>
                <IconUserPlus />
            </ActionIcon>
            <Drawer opened={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Create Backtest">
                <form onSubmit={handleSubmit}>
                    <TagsInput
                        required
                        label="Symbols"
                        name="symbols"
                        value={backtest.symbols}
                        onChange={(value) => handleChange("symbols", value as string[])}
                        data={[]}
                    />
                    <TextInput
                        required
                        label="Days to Test Over"
                        name="days_to_test_over"
                        value={backtest.days_to_test_over}
                        onChange={(e) => handleChange("days_to_test_over", e.target.value)}
                        error={hasAttempted && !backtest.days_to_test_over}
                        type="number"
                    />
                    <TagsInput
                        label="Strategy Aliases"
                        name="strategy_aliases"
                        value={backtest.strategy_aliases}
                        onChange={(e) => handleChange("strategy_aliases", e)}
                        error={hasAttempted && !backtest.strategy_aliases}
                    />
                    {/* <JsonInput
                        label="Strategy Definitions"
                        name="strategy_definitions"
                        minRows={10}
                        autosize
                        formatOnBlur
                        validationError="Invalid JSON"
                        value={backtest.strategy_definitions}
                        onChange={(e) => handleChange("strategy_definitions", e)}
                        error={hasAttempted && !backtest.strategy_definitions}
                    /> */}
                   
                    <Button type="submit">Create Backtest</Button>
                </form>
            </Drawer>
        </Fragment>
    );
}
