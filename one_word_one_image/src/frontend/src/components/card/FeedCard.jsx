import React from 'react'
import {
    createStyles,
    Paper,
    Text,
    Group,
    Menu,
    ActionIcon,
    Avatar,
    Divider,
    Stack,
} from '@mantine/core'
import {
    IconDots,
    IconEye,
    IconFileZip,
    IconTrash,
    IconHeart,
    IconMessageCircle2,
    IconSend,
} from '@tabler/icons'

import styled from 'styled-components'
import ReactPlayer from 'react-player'

const useStyles = createStyles((theme) => ({
    card: {
        background: 'rgba(41, 41, 83, 1)',
        bordeRadius: '5px',
        position: 'relative',
        zIndex: 'auto',
        boxShadow: '0px 50px 100px rgba(34, 79, 169, 0.3)',
        width: '600px',
        margin: '5rem 0',
        ':before ': {
            content: "''",
            position: 'absolute',
            top: '0',
            right: '0',
            bottom: '0',
            left: '0',
            zIndex: '-1',
            margin: '-5px',
            borderRadius: '8px',
            background: 'linear-gradient(117.03deg, #3672f8 0%, #b01eff 100%)',
            '@media screen and (max-width: 375px)': {
                margin: '-2px',
            },
        },
    },

    z: {
        zIndex: '0',
    },
}))

const FeedCard = ({ urlVideo }) => {
    const { classes } = useStyles()
    return (
        <Paper
            withBorder
            radius='md'
            className={classes.card}
            p={20}
        >
            <Group position='apart'>
                <Avatar
                    radius='xl'
                    src='https://collecter.apprentis-auteuil.org/cdn.iraiser.eu/YIbzhGkk9bX+EtoEinZHNhT8yHPg+ZyDbTkS0OGVfD4w3skiD2FTpVrBrqesA7Ua/Laetitia_Merciris/thumbnail/Logo-Efrei-2017-verticalwhite.png'
                />
                <Text weight={500}>efrei_paris</Text>
                <Menu
                    withinPortal
                    position='bottom-end'
                    shadow='sm'
                >
                    <Menu.Target>
                        <ActionIcon>
                            <IconDots size={16} />
                        </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Item icon={<IconFileZip size={14} />}>
                            Download zip
                        </Menu.Item>
                        <Menu.Item icon={<IconEye size={14} />}>
                            Preview all
                        </Menu.Item>
                        <Menu.Item
                            icon={<IconTrash size={14} />}
                            color='red'
                        >
                            Delete all
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Group>

            <Divider mt={20} />

            <Group mt='sm'>
                <ReactPlayer url={urlVideo} />
            </Group>

            <Group
                mt='md'
                p='md'
                position='apart'
            >
                <Group
                    position='left'
                    spacing='lg'
                >
                    <Group
                        position='apart'
                        spacing='lg'
                    >
                        <Group>
                            <ActionIcon>
                                <IconHeart
                                    size={35}
                                    color='white'
                                />
                            </ActionIcon>
                            500
                        </Group>
                        <Group>
                            <ActionIcon>
                                <IconMessageCircle2
                                    size={35}
                                    color='white'
                                />
                            </ActionIcon>
                            34
                        </Group>
                        <Group>
                            <ActionIcon>
                                <IconSend
                                    size={35}
                                    color='white'
                                />
                            </ActionIcon>
                        </Group>
                    </Group>
                </Group>

                <Group position='right'>
                    <ActionIcon>
                        <IconEye
                            size={35}
                            color='white'
                        />
                    </ActionIcon>
                    1000 views
                </Group>
            </Group>

            <Stack
                p='md'
                align='flex-start'
                justify='center'
            >
                <Group position='apart'>
                    <Text
                        weight={500}
                        color='white'
                    >
                        efrei_paris
                    </Text>
                    <Text
                        color='white'
                        weight='thin'
                    >
                        Wei 2022.
                    </Text>
                </Group>
                <Group position='apart'>
                    <Text
                        weight={500}
                        color='dimmed'
                    >
                        Show 34 comments
                    </Text>
                </Group>
                <Group position='apart'>
                    <Text
                        weight={500}
                        color='white'
                    >
                        GMK
                    </Text>
                    <Text
                        color='white'
                        weight='thin'
                    >
                        Aberrant
                    </Text>
                </Group>
            </Stack>
        </Paper>
    )
}

export default FeedCard

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
        content: '';
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
`
