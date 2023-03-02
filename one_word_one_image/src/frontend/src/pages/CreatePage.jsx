import React, { useContext, useEffect, useState } from 'react'
import Nav from '../components/Nav'
import {
    Stack,
    Group,
    Title,
    ActionIcon,
    Stepper,
    Input,
    Loader,
    LoadingOverlay,
} from '@mantine/core'
import FeedCard from '../components/card/FeedCard'
import ChooseCard from '../components/card/ChooseCard'
import styled from 'styled-components'
import InputFileCard from '../components/card/InputFileCard'
import {
    IconArrowLeft,
    IconArrowRight,
    IconCircleCheck,
    IconEye,
} from '@tabler/icons'
import FooterLinks from '../components/FooterLinks'
import GradientButton from '../components/button/GradientButton'
import BannerCard from '../components/card/BannerCard'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'

const musicMetadata = require('music-metadata-browser')
const CreatePage = () => {
    const [active, setActive] = useState(0)
    const [highestStepVisited, setHighestStepVisited] = useState(active)
    const [youTubeIsClicked, setYouTubeIsClicked] = useState(false)
    const [OWOIAI, setOWOIAI] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [selectedFileCover, setSelectedFileCover] = useState(null)
    const [selectedFileTitle, setSelectedFileTitle] = useState(null)
    const [selectedFileArtist, setSelectedFileArtist] = useState(null)
    const [youtubeUrl, setYoutubeUrl] = useState(null)
    const [youtubeStartTimestamp, setYoutubeStartTimestamp] = useState(null)
    const [youtubeEndTimestamp, setYoutubeEndTimestamp] = useState(null)
    const [clipTitle, setClipTitle] = useState(null)
    const [clipUrl, setClipUrl] = useState(null)
    const [overlay, setOverlay] = useState(false)
    const [profilePicture, setProfilePicture] = useState(null)
    const { user } = useContext(AuthContext)
    console.log(user)

    useEffect(() => {
        getProfilePicture()
    }, [])

    const handleStepChange = (nextStep) => {
        const isOutOfBounds = nextStep > 3 || nextStep < 0

        if (isOutOfBounds) {
            return
        }

        setActive(nextStep)
        setHighestStepVisited(Math.max(nextStep, highestStepVisited))
    }

    // Allow the user to freely go back and forth between visited steps.
    const shouldAllowSelectStep = (step) =>
        highestStepVisited >= step && active !== step

    const handleYouTubeIsClicked = () => {
        setOWOIAI(false)
        setYouTubeIsClicked(true)
    }

    const handleOWOIAIClick = () => {
        setOWOIAI(true)
        setYouTubeIsClicked(false)
    }

    const handleOnDrop = async (acceptedFiles) => {
        // Update the selectedFile state with the accepted file
        console.log(acceptedFiles[0])

        const metadata = await musicMetadata.parseBlob(acceptedFiles[0])
        console.log(metadata)
        const cover = musicMetadata.selectCover(metadata.common.picture)
        console.log(cover)

        const coverFormated = URL.createObjectURL(
            new Blob([cover.data], { type: 'image/png' } /* (1) */)
        )

        console.log(coverFormated)

        const artist = metadata.common.artist
        const title = metadata.common.title

        setSelectedFile(acceptedFiles[0])
        setSelectedFileCover(coverFormated)
        setSelectedFileTitle(title)
        setSelectedFileArtist(artist)
    }

    const handleYoutubeUrlChange = (event) => {
        // Update the state youtubeUrl on input value change
        setYoutubeUrl(event.target.value)
    }

    const handleYoutubeStartTimestampChange = (event) => {
        // set the state startTimestamp on input value change
        setYoutubeStartTimestamp(event.target.value)
    }
    const handleYoutubeEndTimestampChange = (event) => {
        // set the state endTimestamp on input value change
        setYoutubeEndTimestamp(event.target.value)
    }

    const handleClipTitleChange = (event) => {
        setClipTitle(event.target.value)
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault()
        console.log('username', user.username)
        console.log('submit')
        setOverlay(true)
        const response = await fetch('http://127.0.0.1:8000/api/clip/new/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: user.username,
                video_name: clipTitle,
                youtube_url: youtubeUrl,
                timestamp_start: youtubeStartTimestamp,
                timestamp_end: youtubeEndTimestamp,
            }),
        })
        const data = await response.json()
        console.log('data', data)
        console.log('response', response)

        if (response.status === 200) {
            console.log('success')
            setOverlay(false)
            setClipUrl(data.url)
            handleStepChange(active + 1)
        } else {
            console.log('error')
        }
    }

    const getProfilePicture = async () => {
        console.log(user.user_id)
        const response = await fetch(
            `http://127.0.0.1:8000/api/users/${user.user_id}/`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )

        const data = await response.json()
        console.log('profilePicture', data)
        setProfilePicture(data.profile_picture)
    }

    return (
        <div>
            <Nav />
            <CreateWrapper>
                <Stack
                    direction='column'
                    spacing='xl'
                >
                    <Stepper
                        px={200}
                        my={50}
                        active={active}
                        onStepClick={handleStepChange}
                        breakpoint='sm'
                        size='lg'
                    >
                        <Stepper.Step
                            label='First step'
                            description='How to import your song ?'
                            allowStepSelect={shouldAllowSelectStep(0)}
                        >
                            <Group
                                position='center'
                                mt={50}
                            >
                                <Title
                                    style={{ fontFamily: 'Gilroy' }}
                                    color='white'
                                    weight={500}
                                >
                                    Choose with what method you will import your
                                    song !
                                </Title>
                            </Group>

                            <Group
                                position='center'
                                spacing='xl'
                            >
                                <ChooseCard
                                    youTubeIsClicked={youTubeIsClicked}
                                    OWOIAI={OWOIAI}
                                    handleOWOIAIClick={handleOWOIAIClick}
                                    handleYouTubeClick={handleYouTubeIsClicked}
                                />
                            </Group>

                            <Group
                                position='center'
                                mb='xl'
                            >
                                <GradientButton
                                    gradientColor='linear-gradient(93.96deg, #4F73C3 0%, #3C46A2 100%);'
                                    size='xl'
                                    radius='md'
                                    disabled={!OWOIAI && !youTubeIsClicked}
                                    onClick={() => handleStepChange(active + 1)}
                                >
                                    Next Step
                                    <ActionIcon>
                                        <IconArrowRight
                                            color={
                                                !OWOIAI && !youTubeIsClicked
                                                    ? 'transparent'
                                                    : 'white'
                                            }
                                        />
                                    </ActionIcon>
                                </GradientButton>
                            </Group>
                        </Stepper.Step>
                        <Stepper.Step
                            label='Second step'
                            description='Import audio file'
                            allowStepSelect={shouldAllowSelectStep(1)}
                        >
                            <Group
                                position='center'
                                mt={50}
                                my={100}
                            >
                                <Stack
                                    direction='column'
                                    spacing='xl'
                                >
                                    {youTubeIsClicked && (
                                        <form
                                            onSubmit={handleOnSubmit}
                                            style={{
                                                position: 'relative',
                                            }}
                                        >
                                            <LoadingOverlay
                                                visible={overlay}
                                                overlayBlur={6}
                                                exitTransitionDuration={1000}
                                                transitionDuration={1000}
                                                radius='lg'
                                                loader={
                                                    <Group
                                                        position='center'
                                                        my={100}
                                                    >
                                                        <Stack
                                                            align='center'
                                                            spacing='xl'
                                                            justify='center'
                                                        >
                                                            <Loader
                                                                color='indigo'
                                                                size='xl'
                                                                variant='bars'
                                                            />

                                                            <Title
                                                                align='center'
                                                                px={50}
                                                                order={2}
                                                                style={{
                                                                    fontFamily:
                                                                        'Gilroy',
                                                                }}
                                                            >
                                                                Generation of
                                                                your clip,
                                                                please wait
                                                                several minutes
                                                            </Title>
                                                        </Stack>
                                                    </Group>
                                                }
                                            />
                                            <Stack
                                                spacing='xl'
                                                justify='space-around'
                                            >
                                                <BannerCard />
                                                <Title
                                                    color='white'
                                                    align='center'
                                                    style={{
                                                        textDecoration: 'none',
                                                        fontFamily: 'Gilroy',
                                                    }}
                                                    weight={500}
                                                >
                                                    Enter the link from Youtube
                                                    that you want to use
                                                </Title>
                                                <Input
                                                    placeholder='https://www.youtube.com/watch?v='
                                                    size='xl'
                                                    onChange={
                                                        handleYoutubeUrlChange
                                                    }
                                                    styles={{
                                                        input: {
                                                            backgroundColor:
                                                                '#0C1E51',
                                                            border: '1px solid #3672F8',
                                                        },
                                                    }}
                                                />
                                                <Group position='apart'>
                                                    <Stack>
                                                        <Title
                                                            color='white'
                                                            align='center'
                                                            style={{
                                                                textDecoration:
                                                                    'none',
                                                                fontFamily:
                                                                    'Gilroy',
                                                            }}
                                                            weight={500}
                                                        >
                                                            Enter the start
                                                            timestamp
                                                        </Title>
                                                        <Input
                                                            placeholder='60'
                                                            size='xl'
                                                            onChange={
                                                                handleYoutubeStartTimestampChange
                                                            }
                                                            styles={{
                                                                input: {
                                                                    backgroundColor:
                                                                        '#0C1E51',
                                                                    border: '1px solid #3672F8',
                                                                },
                                                            }}
                                                        />
                                                    </Stack>
                                                    <Stack>
                                                        <Title
                                                            color='white'
                                                            align='center'
                                                            style={{
                                                                textDecoration:
                                                                    'none',
                                                                fontFamily:
                                                                    'Gilroy',
                                                            }}
                                                            weight={500}
                                                        >
                                                            Enter the end
                                                            timestamp
                                                        </Title>
                                                        <Input
                                                            placeholder='120'
                                                            size='xl'
                                                            onChange={
                                                                handleYoutubeEndTimestampChange
                                                            }
                                                            styles={{
                                                                input: {
                                                                    backgroundColor:
                                                                        '#0C1E51',
                                                                    border: '1px solid #3672F8',
                                                                },
                                                            }}
                                                        />
                                                    </Stack>
                                                </Group>

                                                <Title
                                                    color='white'
                                                    align='center'
                                                    style={{
                                                        textDecoration: 'none',
                                                        fontFamily: 'Gilroy',
                                                    }}
                                                    weight={500}
                                                >
                                                    Enter the title of your Clip
                                                </Title>
                                                <Input
                                                    placeholder='Title'
                                                    size='xl'
                                                    onChange={
                                                        handleClipTitleChange
                                                    }
                                                    styles={{
                                                        input: {
                                                            backgroundColor:
                                                                '#0C1E51',
                                                            border: '1px solid #3672F8',
                                                        },
                                                    }}
                                                />

                                                <Group
                                                    position='center'
                                                    mb='xl'
                                                >
                                                    <GradientButton
                                                        variant='default'
                                                        size='xl'
                                                        radius='md'
                                                        onClick={() =>
                                                            handleStepChange(
                                                                active - 1
                                                            )
                                                        }
                                                    >
                                                        <ActionIcon>
                                                            <IconArrowLeft color='white' />
                                                        </ActionIcon>
                                                        Previous Step
                                                    </GradientButton>
                                                    <GradientButton
                                                        gradientColor='linear-gradient(93.96deg, #4F73C3 0%, #3C46A2 100%);'
                                                        size='xl'
                                                        radius='md'
                                                        disabled={
                                                            !youtubeUrl ||
                                                            !youtubeStartTimestamp ||
                                                            !youtubeEndTimestamp ||
                                                            !clipTitle
                                                        }
                                                        // onClick={() =>
                                                        //     handleStepChange(
                                                        //         active + 1
                                                        //     )
                                                        // }
                                                        type='submit'
                                                    >
                                                        Next Step
                                                        <ActionIcon>
                                                            <IconArrowRight
                                                                color={
                                                                    !youtubeUrl ||
                                                                    !youtubeStartTimestamp ||
                                                                    !youtubeEndTimestamp
                                                                        ? 'transparent'
                                                                        : 'white'
                                                                }
                                                            />
                                                        </ActionIcon>
                                                    </GradientButton>
                                                </Group>
                                            </Stack>
                                        </form>
                                    )}
                                </Stack>
                            </Group>

                            {OWOIAI && (
                                <>
                                    <Group
                                        position='center'
                                        mt={50}
                                    >
                                        <Title
                                            style={{ fontFamily: 'Gilroy' }}
                                            color='white'
                                            weight={500}
                                        >
                                            What song will you use for your new
                                            clip ?
                                        </Title>
                                    </Group>

                                    <Group
                                        position='center'
                                        spacing='xl'
                                    >
                                        <InputFileCard
                                            selectedFile={selectedFile}
                                            selectedFileArtist={
                                                selectedFileArtist
                                            }
                                            selectedFileCover={
                                                selectedFileCover
                                            }
                                            selectedFileTitle={
                                                selectedFileTitle
                                            }
                                            onDrop={handleOnDrop}
                                        />
                                    </Group>

                                    <Group
                                        position='center'
                                        my={100}
                                    >
                                        <Stack
                                            direction='column'
                                            spacing='xl'
                                        >
                                            <Title
                                                color='white'
                                                weight={500}
                                                style={{
                                                    textDecoration: 'none',
                                                    fontFamily: 'Gilroy',
                                                }}
                                            >
                                                Enter a title for your Clip
                                            </Title>
                                            <Input
                                                size='xl'
                                                styles={{
                                                    input: {
                                                        backgroundColor:
                                                            '#0C1E51',
                                                        border: '1px solid #3672F8',
                                                    },
                                                }}
                                            />
                                        </Stack>
                                    </Group>

                                    <Group
                                        position='center'
                                        mb='xl'
                                    >
                                        <GradientButton
                                            variant='default'
                                            size='xl'
                                            radius='md'
                                            onClick={() =>
                                                handleStepChange(active - 1)
                                            }
                                        >
                                            <ActionIcon>
                                                <IconArrowLeft color='white' />
                                            </ActionIcon>
                                            Previous Step
                                        </GradientButton>
                                        <GradientButton
                                            gradientColor='linear-gradient(93.96deg, #4F73C3 0%, #3C46A2 100%);'
                                            size='xl'
                                            radius='md'
                                            disabled={selectedFile === null}
                                            onClick={() =>
                                                handleStepChange(active + 1)
                                            }
                                        >
                                            Next Step
                                            <ActionIcon>
                                                <IconArrowRight
                                                    color={
                                                        selectedFile === null
                                                            ? 'transparent'
                                                            : 'white'
                                                    }
                                                />
                                            </ActionIcon>
                                        </GradientButton>
                                    </Group>
                                </>
                            )}
                        </Stepper.Step>
                        <Stepper.Step
                            label='Final step'
                            description='Generate your clip'
                            allowStepSelect={shouldAllowSelectStep(2)}
                        >
                            <Group
                                position='center'
                                mt={50}
                            >
                                <Title
                                    style={{ fontFamily: 'Gilroy' }}
                                    color='white'
                                >
                                    Your clip has been successfully generated !
                                </Title>
                            </Group>

                            <Group
                                position='center'
                                my={100}
                            >
                                <IconCircleCheck
                                    color='#3672F8'
                                    size={150}
                                />
                            </Group>

                            <Group
                                position='center'
                                mb='xl'
                            >
                                <GradientButton
                                    variant='default'
                                    size='xl'
                                    radius='md'
                                    onClick={() => handleStepChange(active - 1)}
                                >
                                    <ActionIcon>
                                        <IconArrowLeft color='white' />
                                    </ActionIcon>
                                    Previous Step
                                </GradientButton>

                                <GradientButton
                                    gradientColor='linear-gradient(93.96deg, #4F73C3 0%, #3C46A2 100%);'
                                    size='xl'
                                    radius='md'
                                    onClick={() => handleStepChange(active + 1)}
                                >
                                    Next Step
                                    <ActionIcon>
                                        <IconArrowRight color='white' />
                                    </ActionIcon>
                                </GradientButton>
                            </Group>
                        </Stepper.Step>

                        <Stepper.Completed>
                            <Group
                                position='center'
                                mt={50}
                            >
                                <Title
                                    style={{ fontFamily: 'Gilroy' }}
                                    color='white'
                                >
                                    Your clip has been successfully generated !
                                </Title>
                            </Group>

                            <Group position='center'>
                                <FeedCard
                                    urlVideo={clipUrl}
                                    username={user.username}
                                    profilePicture={profilePicture}
                                    userId={user.id}
                                    videoTitle={clipTitle}
                                />
                            </Group>

                            <Group
                                position='center'
                                mb='xl'
                            >
                                <Link to='/clips'>
                                    <GradientButton
                                        gradientColor='linear-gradient(93.96deg, #4F73C3 0%, #3C46A2 100%);'
                                        size='xl'
                                        radius='md'
                                        disabled={false}
                                        onClick={() =>
                                            handleStepChange(active + 1)
                                        }
                                    >
                                        My Clips
                                        <ActionIcon ml={5}>
                                            <IconEye color='white' />
                                        </ActionIcon>
                                    </GradientButton>
                                </Link>
                            </Group>
                        </Stepper.Completed>
                    </Stepper>
                </Stack>
            </CreateWrapper>
            <FooterLinks />
        </div>
    )
}

export default CreatePage

const CreateWrapper = styled.div`
    position: relative;
    z-index: 1;
    margin-top: 10rem;
`
