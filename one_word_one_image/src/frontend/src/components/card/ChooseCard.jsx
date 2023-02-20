import React from 'react'
import { createStyles, Paper, Text, Group, Image, Stack } from '@mantine/core'
import {} from '@tabler/icons'
import GradientButton from '../button/GradientButton'
import youtube from '../../assets/images/youtube.svg'
import rafiki from '../../assets/images/rafiki.svg'

const useStyles = createStyles((theme) => ({
    card: {
        background: 'rgba(41, 41, 83, 1)',
        bordeRadius: '5px',
        position: 'relative',
        zIndex: 'auto',
        boxShadow: '0px 50px 100px rgba(34, 79, 169, 0.3)',
        width: '500px',
        margin: '5rem 0',
    },

    youTube: {
        background: 'rgba(41, 41, 83, 1)',
        bordeRadius: '5px',
        position: 'relative',
        zIndex: 'auto',
        boxShadow: '0px 50px 100px rgba(34, 79, 169, 0.3)',
        width: '450px',
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
            background: 'linear-gradient(117.03deg, #FF005C 0%, #BA3434 100%)',
            '@media screen and (max-width: 375px)': {
                margin: '-2px',
            },
        },
    },

    OWOIAI: {
        background: 'rgba(41, 41, 83, 1)',
        bordeRadius: '5px',
        position: 'relative',
        zIndex: 'auto',
        boxShadow: '0px 50px 100px rgba(34, 79, 169, 0.3)',
        width: '450px',
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
            background:
                'linear-gradient(115.74deg, #14F1D9 1.79%, #3672F8 100%)',
            '@media screen and (max-width: 375px)': {
                margin: '-2px',
            },
        },
    },
}))
const ChooseCard = ({
    youTubeIsClicked,
    OWOIAI,
    handleOWOIAIClick,
    handleYouTubeClick,
}) => {
    const { classes } = useStyles()
    return (
        <Group
            my='lg'
            position='center'
            spacing='xl'
        >
            <Paper
                withBorder
                radius='md'
                className={youTubeIsClicked ? classes.youTube : classes.card}
                p={50}
            >
                <Group
                    mt='sm'
                    position='center'
                    spacing={'md'}
                >
                    <Image
                        src={youtube}
                        width={300}
                        height={270}
                        fit='contain'
                    />
                    <Text
                        p='3rem'
                        align='center'
                        size='xl'
                        color='white'
                    >
                        Search for a specific song on Youtube
                    </Text>

                    <GradientButton
                        gradientColor='linear-gradient(117.03deg, #FF005C 0%, #BA3434 100%)'
                        size='lg'
                        color='white'
                        radius='md'
                        shadow='md'
                        onClick={handleYouTubeClick}
                    >
                        Use a Youtube video
                    </GradientButton>
                </Group>
            </Paper>

            <Paper
                withBorder
                radius='md'
                className={OWOIAI ? classes.OWOIAI : classes.card}
                p={50}
            >
                <Group
                    mt='sm'
                    position='center'
                    spacing='xl'
                >
                    <Image
                        src={rafiki}
                        width={300}
                        fit='contain'
                    />
                    <Text
                        align='center'
                        size='xl'
                        color='white'
                        p='3rem'
                    >
                        Let our audio recognition AI do the work for you
                        (usefull for unknown songs)
                    </Text>

                    <GradientButton
                        gradientColor='linear-gradient(115.74deg, #14F1D9 1.79%, #3672F8 100%)'
                        size='lg'
                        color='white'
                        radius='md'
                        shadow='md'
                        onClick={handleOWOIAIClick}
                    >
                        Use OneWordOneImage AI
                    </GradientButton>
                </Group>
            </Paper>
        </Group>
    )
}

export default ChooseCard
