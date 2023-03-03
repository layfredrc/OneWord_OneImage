import React, { useEffect, useState } from 'react'
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
    Modal,
    Input,
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
import pp from '../../assets/images/profilePicture.png'
import GradientButton from '../button/GradientButton'
import { CommentsList } from './CommentsList'
import IconHeartFilled from '../../assets/images/heart-filled.svg'
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
const FeedCard = ({
    urlVideo,
    username,
    profilePicture,
    videoTitle,
    views,
    likes,
    comments,
    userId,
    clipId,
    users,
}) => {
    const { classes } = useStyles()
    const [isLiked, setIsLiked] = useState(false)
    const [clipLikes, setClipLikes] = useState(likes)
    console.log('comments', comments)
    const [commentsList, setCommentList] = useState(comments)
    const [newestComment, setNewestComment] = useState('')
    const [opened, setOpened] = useState(false)
    const [inputComment, setInputComment] = useState('')
    const [socialModal, setSocialModal] = useState(false)
    const [shareUrl, setShareUrl] = useState('')
    const [shareTitle, setShareTitle] = useState('')

    const openModal = () => {
        setSocialModal(true)
        setShareUrl(urlVideo) // Replace with the URL you want to share
        setShareTitle(videoTitle) // Replace with the title you want to share
    }

    const getNewestComment = () => {
        if (commentsList) {
            const lastComment = commentsList[commentsList.length - 1]
            setNewestComment(lastComment)
        }
    }

    const getUsername = (userCommentId) => {
        const user = users.find((user) => user.id === userCommentId)
        return user.username
    }

    const handleInputComment = (e) => {
        setInputComment(e.target.value)
    }

    const handleSubmitComment = async (event) => {
        event.preventDefault()
        const response = await fetch('http://127.0.0.1:8000/api/comments/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                clip: clipId,
                user: userId,
                comment: inputComment,
            }),
        })
        const data = await response.json()
        console.log('data', data)
        console.log('response', response)

        if (response.status === 201) {
            console.log('success', commentsList)
            setCommentList([...commentsList, data])
        } else {
            console.log('error')
        }
    }

    const handleLike = () => {
        setIsLiked(!isLiked)
        if (isLiked && clipLikes > 0) {
            setClipLikes(clipLikes - 1)
        } else {
            setClipLikes(clipLikes + 1)
        }
    }

    useEffect(() => {
        getNewestComment()
    }, [commentsList])

    return (
        <Paper
            withBorder
            radius='md'
            className={classes.card}
            p={20}
        >
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title='Comments'
                centered
                closeOnClickOutside
                closeOnEscape
                overlayBlur={2}
                size={600}
                transition={opened ? 'slide-down' : 'slide-up'}
                transitionDuration={300}
            >
                <Stack
                    p='md'
                    align='flex-start'
                    justify='center'
                    spacing='xl'
                >
                    <CommentsList
                        commentsList={commentsList}
                        getUsername={getUsername}
                    />
                    <Group
                        position='apart'
                        my={20}
                    >
                        <Input
                            size='md'
                            placeholder='Write a comment...'
                            onChange={handleInputComment}
                        />
                        <GradientButton
                            gradientColor='linear-gradient(117.03deg, #3672F8 0%, #B01EFF 100%)'
                            type='submit'
                            size='md'
                            radius='md'
                            rightIcon={<IconSend size={20} />}
                            onClick={handleSubmitComment}
                        >
                            Send
                        </GradientButton>
                    </Group>
                </Stack>
            </Modal>
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
            <Group position='apart'>
                <Avatar
                    radius='xl'
                    src={profilePicture ? profilePicture : pp}
                />
                <Text weight={500}>{username ? username : 'efrei_paris'}</Text>
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
                <ReactPlayer
                    url={urlVideo}
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
                            <ActionIcon onClick={handleLike}>
                                {isLiked ? (
                                    <img
                                        src={IconHeartFilled}
                                        size={35}
                                        fill='red'
                                        style={{ fill: 'red', color: 'red' }}
                                        alt='heart'
                                    />
                                ) : (
                                    <IconHeart
                                        size={35}
                                        color='white'
                                    />
                                )}
                            </ActionIcon>
                            {clipLikes.toString()}
                        </Group>
                        <Group onClick={() => setOpened(true)}>
                            <ActionIcon>
                                <IconMessageCircle2
                                    size={35}
                                    color='white'
                                />
                            </ActionIcon>
                            {commentsList.length}
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
                    {views.toString()} views
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
                        {username ? username : 'efrei_paris'}
                    </Text>
                    <Text
                        color='white'
                        weight='thin'
                    >
                        {videoTitle}
                    </Text>
                </Group>
                <Group position='apart'>
                    <Text
                        weight={500}
                        color='dimmed'
                        onClick={() => setOpened(true)}
                    >
                        Show {commentsList.length} comments
                    </Text>
                </Group>

                <Group position='apart'>
                    <Text
                        weight={500}
                        color='white'
                    >
                        {newestComment ? getUsername(newestComment.user) : ''}
                    </Text>
                    <Text
                        color='white'
                        weight='thin'
                    >
                        {newestComment ? newestComment.comment : ''}
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
