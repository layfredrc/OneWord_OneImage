import React from 'react'
import { Group, Title, Grid } from '@mantine/core'
import Nav from '../components/Nav'
import ClipCard from '../components/card/ClipCard'

const ClipsPage = () => {
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
                    <Grid.Col
                        md={6}
                        lg={4}
                    >
                        <ClipCard
                            title='Bande organisée'
                            urlVideo='https://www.youtube.com/watch?v=-CVn3-3g_BI'
                        />
                    </Grid.Col>
                    <Grid.Col
                        md={6}
                        lg={4}
                    >
                        <ClipCard
                            title='667'
                            urlVideo='https://www.youtube.com/watch?v=cgDZN44WpoE'
                        />
                    </Grid.Col>
                    <Grid.Col
                        md={6}
                        lg={4}
                    >
                        <ClipCard
                            title='Drill FR'
                            urlVideo='https://www.youtube.com/watch?v=lbeUyW6axeA'
                        />
                    </Grid.Col>
                    <Grid.Col
                        md={6}
                        lg={4}
                    >
                        <ClipCard
                            title='Bande organisée'
                            urlVideo='https://www.youtube.com/watch?v=-CVn3-3g_BI'
                        />
                    </Grid.Col>
                    <Grid.Col
                        md={6}
                        lg={4}
                    >
                        <ClipCard
                            title='667'
                            urlVideo='https://www.youtube.com/watch?v=cgDZN44WpoE'
                        />
                    </Grid.Col>
                    <Grid.Col
                        md={6}
                        lg={4}
                    >
                        <ClipCard
                            title='Drill FR'
                            urlVideo='https://www.youtube.com/watch?v=lbeUyW6axeA'
                        />
                    </Grid.Col>
                </Grid>
            </Group>
        </div>
    )
}

export default ClipsPage
