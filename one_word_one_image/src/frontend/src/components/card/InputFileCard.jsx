import React from "react";
import {
    createStyles,
    Paper,
    Text,
    Group,
    ActionIcon,
    Divider,
    Image,
    Stack,
} from "@mantine/core";
import {
    IconEye,
    IconHeart,
    IconMessageCircle2,
    IconSend,
} from "@tabler/icons";

import styled from "styled-components";
import illustration from "../../assets/images/import.svg";
const useStyles = createStyles((theme) => ({
    card: {
        background: "rgba(41, 41, 83, 1)",
        bordeRadius: "5px",
        position: "relative",
        zIndex: "auto",
        boxShadow: "0px 50px 100px rgba(34, 79, 169, 0.3)",
        width: "500px",
        margin: "5rem 0",

    },

    z: {
        zIndex: "0",
    },
}));

const InputFileCard = () => {
    const { classes, theme } = useStyles();
    return (
        <Paper withBorder radius='md' className={classes.card} p={20}>
            <Group mt='sm' position="center">
                <Image src={illustration} width={300}
                    height={400}
                    fit="contain" />
            </Group>

            <Stack p='md' align='center' justify='center'>
                <Text>
                    Import audio files from your local devices
                    .mp3 / .wav
                </Text>
            </Stack>


        </Paper>
    );
};

export default InputFileCard;

export const GradientContainer = styled.div`
	margin-top: 3rem;
	background: #fcfcfd;
	border-radius: 5px;
	position: relative;
	padding: 3.5rem;
	z-index: auto;
	@media screen and (max-width: 860px) {
		padding: 1.5rem;
	}

	:before {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: -1;
		margin: -5px;
		border-radius: 8px;
		background: linear-gradient(117.03deg, #3672f8 0%, #b01eff 100%);
		@media screen and (max-width: 375px) {
			margin: -2px;
		}
	}

	@media screen and (max-width: 375px) {
		padding: 1rem;
	}
`;
