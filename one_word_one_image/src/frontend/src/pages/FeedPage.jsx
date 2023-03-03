import React, { useState, useEffect, useContext } from 'react'
import Nav from '../components/Nav'
import { Stack, Group, Title } from '@mantine/core'

import styled from 'styled-components'
import Logo from '../assets/images/logo.svg'

import FeedCard from '../components/card/FeedCard'
import FooterLinks from '../components/FooterLinks'
import AuthContext from '../context/AuthContext'

const FeedPage = () => {
    const [clips, setClips] = useState()
    const [comments, setComments] = useState()
    const [users, setUsers] = useState()

    let { user } = useContext(AuthContext)
    console.log('user', user)
    const currentHost = `${window.location.protocol}//${window.location.hostname}`
    const getClips = async () => {
        const response = await fetch(`${currentHost}:8000/api/clips/`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        const clips = await response.json()
        const clipsOrderedByNewest = clips.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
        )
        setClips(clipsOrderedByNewest)
    }

    const getComments = async () => {
        const response = await fetch(`${currentHost}:8000/api/comments/`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        const comments = await response.json()

        setComments(comments)
    }

    const getUsers = async () => {
        const response = await fetch(`${currentHost}:8000/api/users/`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        const users = await response.json()
        setUsers(users)
    }

    useEffect(() => {
        getClips()
        getComments()
        getUsers()
    }, [])

    return (
        clips &&
        comments &&
        users && (
            <div>
                <Nav />
                <Group
                    position='center'
                    mt={50}
                >
                    <img
                        src={Logo}
                        alt='Logo'
                    />
                    <Title
                        style={{ fontFamily: 'Gilroy' }}
                        color='white'
                        weight={500}
                    >
                        OneWordOneImage
                    </Title>
                </Group>
                <FeedWrapper>
                    <Stack
                        justify='apart'
                        align='center'
                        spacing='xl'
                        style={{
                            position: 'relative',
                            zIndex: 1,
                        }}
                    >
                        {clips.map((clip) => (
                            <FeedCard
                                key={clip.id}
                                username={user.username}
                                urlVideo={clip.clip_url_aws}
                                profilePicture={user.profile_picture}
                                videoTitle={clip.clip_name}
                                likes={clip.clip_likes}
                                views={clip.clip_views}
                                userId={user.user_id}
                                clipId={clip.id}
                                comments={comments.filter(
                                    (c) => c.clip === clip.id
                                )}
                                users={users}
                            />
                        ))}
                    </Stack>
                </FeedWrapper>
                <FooterLinks />
            </div>
        )
    )
}

export default FeedPage

const FeedWrapper = styled.div`
    position: relative;
    z-index: 1;
    margin-top: 10rem;
`
