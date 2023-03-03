import React, { useState } from 'react'
import {
    createStyles,
    Paper,
    Group,
    ActionIcon,
    Divider,
    Title,
    Modal,
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
import {
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon,
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
} from 'react-share'

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

const ClipCard = ({ urlVideo, title, clip, comments }) => {
    const { classes } = useStyles()
    const [socialModal, setSocialModal] = useState(false)
    const [shareUrl, setShareUrl] = useState('')
    const [shareTitle, setShareTitle] = useState('')

    const openModal = () => {
        setSocialModal(true)
        setShareUrl(urlVideo) // Replace with the URL you want to share
        setShareTitle(title) // Replace with the title you want to share
    }
    return (
        <Paper
            withBorder
            radius='md'
            className={classes.card}
            p={20}
        >
            <Modal
                opened={socialModal}
                onClose={() => setSocialModal(false)}
                title='Share this content'
                centered
                closeOnClickOutside
                closeOnEscape
                overlayBlur={2}
                size={600}
                transition={socialModal ? 'slide-down' : 'slide-up'}
                transitionDuration={300}
            >
                <Group
                    spacing={'xl'}
                    position='center'
                    mb={20}
                >
                    <FacebookShareButton
                        url={shareUrl}
                        title={shareTitle}
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <FacebookIcon
                            size={50}
                            round
                        />
                    </FacebookShareButton>
                    <TwitterShareButton
                        url={shareUrl}
                        title={shareTitle}
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <TwitterIcon
                            size={50}
                            round
                        />
                    </TwitterShareButton>
                    <LinkedinShareButton
                        url={shareUrl}
                        title={shareTitle}
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <LinkedinIcon
                            size={50}
                            round
                        />
                    </LinkedinShareButton>
                    <WhatsappShareButton
                        url={shareUrl}
                        title={shareTitle}
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <WhatsappIcon
                            size={50}
                            round
                        />
                    </WhatsappShareButton>
                </Group>
            </Modal>
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
                    controls
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
                            {clip.clip_likes.toString()}
                        </Group>
                        <Group>
                            <ActionIcon>
                                <IconMessageCircle2
                                    size={35}
                                    color='white'
                                />
                            </ActionIcon>
                            {comments.length.toString()}
                        </Group>
                        <Group onClick={openModal}>
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

            <a
                href={urlVideo}
                target='_blank'
                rel='noreferrer'
            >
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
            </a>
        </Paper>
    )
}

export default ClipCard
