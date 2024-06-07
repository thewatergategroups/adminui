import { Divider, Group, Paper } from "@mantine/core";
import UserInformation from "../permissions/UserInformation";




export default function Landing() {

    return (
        <Paper withBorder p="md" radius="md" shadow="sm" key="Welcome">
        <Group justify="apart" mb="md">
            <h2>Welcome Back</h2>
        </Group>
        <Divider my="sm" />
        <UserInformation />
      </Paper>
    );
}
