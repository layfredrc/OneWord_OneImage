import React, { useContext, useState, useEffect } from 'react'
import { Group, Title, Grid } from '@mantine/core'
import Nav from '../components/Nav'
import ClipCard from '../components/card/ClipCard'
import AuthContext from '../context/AuthContext'

const ClipsPage = () => {
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

    const userClips = clips.filter((clip) => clip.user === user.user_id)
    return (
        <div>
            <Nav />
            <Group
                position='center'
                mt={50}
            >
                <Title
                    style={{ fontFamily: 'Gilroy' }}
                    color='white'
                    weight={500}
                >
                    My Clips
                </Title>
            </Group>

            <Group
                position='center'
                mt={200}
                px={30}
                style={{
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <Grid
                    justify='space-around'
                    gutter='xl'
                >
                    {userClips.map((clip) => (
                        <Grid.Col
                            md={6}
                            lg={4}
                        >
                            <ClipCard
                                title={clip.clip_name}
                                urlVideo={clip.clip_url_aws}
                            />
                        </Grid.Col>
                    ))}
                </Grid>
            </Group>
        </div>
    )
}

export default ClipsPage
