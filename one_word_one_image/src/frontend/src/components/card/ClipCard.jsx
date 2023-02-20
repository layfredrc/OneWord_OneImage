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
    Title,
} from '@mantine/core'

import {
    IconDownload,
    IconEye,
    IconHeart,
    IconMessageCircle2,
    IconSend,
} from '@tabler/icons'

import ReactPlayer from 'react-player'
import GradientButton from '../button/GradientButton'

const useStyles = createStyles((theme) => ({
    card: {
        background: 'rgba(41, 41, 83, 1)',
        bordeRadius: '5px',
        position: 'relative',
        zIndex: 'auto',
        boxShadow: '0px 50px 100px rgba(34, 79, 169, 0.3)',
        margin: '5rem 0',
    },

    z: {
        zIndex: '0',
    },
}))

const ClipCard = ({ urlVideo, title }) => {
    const { classes } = useStyles()
    return (
        <Paper
            withBorder
            radius='md'
            className={classes.card}
            p={20}
        >
            <Group position='center'>
                <Title
                    style={{ fontFamily: 'Gilroy' }}
                    order={2}
                    weight={500}
                >
                    {title}
                </Title>
            </Group>

            <Divider mt={20} />

            <Group
                mt='sm'
                position='center'
            >
                <ReactPlayer
                    url={urlVideo}
                    width={'100%'}
                />
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

            <GradientButton
                gradientColor='linear-gradient(117.03deg, #3672F8 0%, #B01EFF 100%)'
                type='submit'
                size='xl'
                radius='md'
                fullWidth
                rightIcon={<IconDownload size={20} />}
            >
                Download
            </GradientButton>
        </Paper>
    )
}

export default ClipCard
