import React, { useState, useEffect, useContext } from 'react'
import Nav from '../components/Nav'
import { Stack, Group, Title } from '@mantine/core'

import styled from 'styled-components'
import Logo from '../assets/images/logo.svg'

import FeedCard from '../components/card/FeedCard'
import FooterLinks from '../components/FooterLinks'
import AuthContext from '../context/AuthContext'

const FeedPage = () => {
    const [clips, setClips] = useState([])
    let { user } = useContext(AuthContext)

    const getClips = async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/clips/`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        const clips = await response.json()
        setClips(clips)
    }

    useEffect(() => {
        getClips()
    }, [])

    return (
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
                            username={user.username}
                            urlVideo={clip.clip_url_aws}
                            profilePicture={user.profile_picture}
                            videoTitle={clip.clip_name}
                        />
                    ))}
                </Stack>
            </FeedWrapper>
            <FooterLinks />
        </div>
    )
}

export default FeedPage

const FeedWrapper = styled.div`
    position: relative;
    z-index: 1;
    margin-top: 10rem;
`
