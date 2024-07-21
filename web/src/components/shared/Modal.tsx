import { Modal as MantineModal } from "@mantine/core";
import styled from "styled-components";

export default styled(MantineModal)`
    .mantine-Modal-inner {
        right: 0;
    }
    .mantine-Modal-body,
    .mantine-Modal-body > form {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
    }
`;

