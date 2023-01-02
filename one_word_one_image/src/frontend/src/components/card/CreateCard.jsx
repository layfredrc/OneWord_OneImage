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

const useStyles = createStyles((theme) => ({
    card: {
        background: "rgba(41, 41, 83, 1)",
        bordeRadius: "5px",
        position: "relative",
        zIndex: "auto",
        boxShadow: "0px 50px 100px rgba(34, 79, 169, 0.3)",
        width: "450px",
        margin: "5rem 0",
        ":before ": {
            content: "''",
            position: "absolute",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
            zIndex: "-1",
            margin: "-5px",
            borderRadius: "8px",
            background: "linear-gradient(117.03deg, #3672f8 0%, #b01eff 100%)",
            "@media screen and (max-width: 375px)": {
                margin: "-2px",
            },
        },
    },

    z: {
        zIndex: "0",
    },
}));

const CreateCard = ({ thumbnail }) => {
    const { classes, theme } = useStyles();
    return (
        <Paper withBorder radius='md' className={classes.card} p={20}>
            <Group mt='sm'>
                <Image src={thumbnail} />
            </Group>

            <Stack p='md' align='center' justify='center'>
                <Text>
                    PopSmoke - Welcome To The Party
                </Text>
            </Stack>
        </Paper>
    );
};

export default CreateCard;

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
