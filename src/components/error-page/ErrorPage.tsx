import { Button, Container, SimpleGrid, Text, Title } from "@mantine/core";
import Lottie from "lottie-react";
import styled from "styled-components";
import BuildingAnimation from "../../assets/animations/404.json";

const StyledContainer = styled(Container)`
    & {
        padding: 4rem;
    }

    .title {
        font-weight: 900;
        font-size: rem(34px);
        margin-bottom: var(--mantine-spacing-md);
        font-family:
            Greycliff CF,
            var(--mantine-font-family);

        @media (max-width: $mantine-breakpoint-sm) {
            font-size: rem(32px);
        }
    }

    .control {
        @media (max-width: $mantine-breakpoint-sm) {
            width: 100%;
        }
    }

    .mobile-image {
        @media (min-width: 48em) {
            display: none;
        }
    }

    .desktop-image {
        @media (max-width: 47.99em) {
            display: none;
        }
    }
`;

export default function ErrorPage() {
    return (
        <StyledContainer className="root">
            <SimpleGrid spacing={{ base: 40, sm: 40 }} cols={{ base: 1, sm: 2 }}>
                <Lottie className="mobile-image" animationData={BuildingAnimation} />
                <div>
                    <Title className="title">Something is not right...</Title>
                    <Text c="dimmed" size="lg">
                        Page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to another
                        URL. If you think this is an error contact support.
                    </Text>
                    <Button variant="outline" size="md" mt="xl" className="control" onClick={() => (document.location.href = "/")}>
                        Get back to home page
                    </Button>
                </div>
                <Lottie className="desktop-image" animationData={BuildingAnimation} />
            </SimpleGrid>
        </StyledContainer>
    );
}
