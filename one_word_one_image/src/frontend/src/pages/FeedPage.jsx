import React, { Component } from 'react'
import Nav from '../components/Nav'
import { Stack, Group, Title } from '@mantine/core'

import styled from 'styled-components'
import Logo from '../assets/images/logo.svg'

import FeedCard from '../components/card/FeedCard'
import FooterLinks from '../components/FooterLinks'

export default class FeedPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLogged: true,
        }
    }

    render() {
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
                        <FeedCard urlVideo='https://storage.googleapis.com/owoi_bucket/username/videos/headlines.webm' />
                        <FeedCard urlVideo='https://www.youtube.com/watch?v=kx7P_ENnDPE' />
                        <FeedCard urlVideo='https://www.youtube.com/watch?v=x9yop0nYR9g' />
                    </Stack>
                </FeedWrapper>
                <FooterLinks />
            </div>
        )
    }
}

const FeedWrapper = styled.div`
    position: relative;
    z-index: 1;
    margin-top: 10rem;
`
