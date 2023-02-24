import React, { Component } from 'react'
import Nav from '../components/Nav'
import {
    Stack,
    Group,
    Title,
    ActionIcon,
    Stepper,
    Button,
    Input,
    Loader,
} from '@mantine/core'
import CreateCard from '../components/card/CreateCard'
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

const musicMetadata = require('music-metadata-browser')
export default class CreatePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLogged: true,
            active: 0,
            highestStepVisited: this.active,
            youTubeIsClicked: false,
            OWOIAI: false,
            selectedFile: null,
            selectedFileCover: null,
            selectedFileTitle: null,
            selectedFileArtist: null,
            youtubeUrl: null,
            youtubeStartTimestamp: null,
            youtubeEndTimestamp: null,
            clipTitle: null,
        }
    }

    handleStepChange = (nextStep) => {
        const isOutOfBounds = nextStep > 3 || nextStep < 0

        if (isOutOfBounds) {
            return
        }

        this.setState({
            active: nextStep,
            highestStepVisited: Math.max(
                nextStep,
                this.state.highestStepVisited
            ),
        })
    }

    // Allow the user to freely go back and forth between visited steps.
    shouldAllowSelectStep = (step) =>
        this.state.highestStepVisited >= step && this.state.active !== step

    handleYouTubeIsClicked = () => {
        this.setState({
            youTubeIsClicked: true,
            OWOIAI: false,
        })
    }

    handleOWOIAIClick = () => {
        this.setState({
            youTubeIsClicked: false,
            OWOIAI: true,
        })
    }

    handleOnDrop = async (acceptedFiles) => {
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

        this.setState({
            selectedFile: acceptedFiles[0],
            selectedFileCover: coverFormated,
            selectedFileTitle: title,
            selectedFileArtist: artist,
        })
    }

    handleYoutubeUrlChange = (event) => {
        // Update the state youtubeUrl on input value change

        this.setState({
            youtubeUrl: event.target.value,
        })
    }

    handleYoutubeStartTimestampChange = (event) => {
        // set the state startTimestamp on input value change
        this.setState({
            youtubeStartTimestamp: event.target.value,
        })
    }
    handleYoutubeEndTimestampChange = (event) => {
        // set the state endTimestamp on input value change
        this.setState({
            youtubeEndTimestamp: event.target.value,
        })
    }

    handleClipTitleChange = (event) => {
        this.setState({
            clipTitle: event.target.value,
        })
    }

    render() {
        const {
            youTubeIsClicked,
            OWOIAI,
            selectedFile,
            selectedFileArtist,
            selectedFileCover,
            selectedFileTitle,
            youtubeEndTimestamp,
            youtubeStartTimestamp,
            youtubeUrl,
            clipTitle,
        } = this.state

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
                            active={this.state.active}
                            onStepClick={this.handleStepChange}
                            breakpoint='sm'
                            size='lg'
                        >
                            <Stepper.Step
                                label='First step'
                                description='How to import your song ?'
                                allowStepSelect={this.shouldAllowSelectStep(0)}
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
                                        Choose with what method you will import
                                        your song !
                                    </Title>
                                </Group>

                                <Group
                                    position='center'
                                    spacing='xl'
                                >
                                    <ChooseCard
                                        youTubeIsClicked={youTubeIsClicked}
                                        OWOIAI={OWOIAI}
                                        handleOWOIAIClick={
                                            this.handleOWOIAIClick
                                        }
                                        handleYouTubeClick={
                                            this.handleYouTubeIsClicked
                                        }
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
                                        onClick={() =>
                                            this.handleStepChange(
                                                this.state.active + 1
                                            )
                                        }
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
                                allowStepSelect={this.shouldAllowSelectStep(1)}
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
                                                    size='xl'
                                                    onChange={
                                                        this
                                                            .handleYoutubeUrlChange
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
                                                            size='xl'
                                                            onChange={
                                                                this
                                                                    .handleYoutubeStartTimestampChange
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
                                                            size='xl'
                                                            onChange={
                                                                this
                                                                    .handleYoutubeEndTimestampChange
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
                                                    size='xl'
                                                    onChange={
                                                        this
                                                            .handleClipTitleChange
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
                                                            this.handleStepChange(
                                                                this.state
                                                                    .active - 1
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
                                                            !youtubeEndTimestamp
                                                        }
                                                        onClick={() =>
                                                            this.handleStepChange(
                                                                this.state
                                                                    .active + 1
                                                            )
                                                        }
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
                                                What song will you use for your
                                                new clip ?
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
                                                onDrop={this.handleOnDrop}
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
                                                    this.handleStepChange(
                                                        this.state.active - 1
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
                                                disabled={selectedFile === null}
                                                onClick={() =>
                                                    this.handleStepChange(
                                                        this.state.active + 1
                                                    )
                                                }
                                            >
                                                Next Step
                                                <ActionIcon>
                                                    <IconArrowRight
                                                        color={
                                                            selectedFile ===
                                                            null
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
                                allowStepSelect={this.shouldAllowSelectStep(2)}
                            >
                                <Group
                                    position='center'
                                    mt={50}
                                >
                                    <Title
                                        style={{ fontFamily: 'Gilroy' }}
                                        color='white'
                                    >
                                        Generate your clip with our AI powered
                                        technologies !
                                    </Title>
                                </Group>

                                <Group
                                    position='center'
                                    my={100}
                                >
                                    <Loader
                                        color='indigo'
                                        size='xl'
                                        variant='oval'
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
                                        onClick={() =>
                                            this.handleStepChange(
                                                this.state.active - 1
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
                                        onClick={() =>
                                            this.handleStepChange(
                                                this.state.active + 1
                                            )
                                        }
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
                                        Your clip has been successfully
                                        generated !
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
                                        gradientColor='linear-gradient(93.96deg, #4F73C3 0%, #3C46A2 100%);'
                                        size='xl'
                                        radius='md'
                                        disabled={false}
                                        onClick={() =>
                                            this.handleStepChange(
                                                this.state.active + 1
                                            )
                                        }
                                    >
                                        Watch it
                                        <ActionIcon ml={5}>
                                            <IconEye color='white' />
                                        </ActionIcon>
                                    </GradientButton>
                                </Group>
                            </Stepper.Completed>
                        </Stepper>
                    </Stack>
                </CreateWrapper>
                <FooterLinks />
            </div>
        )
    }
}

const CreateWrapper = styled.div`
    position: relative;
    z-index: 1;
    margin-top: 10rem;
`
