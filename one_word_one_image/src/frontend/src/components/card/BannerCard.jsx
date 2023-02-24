import React from 'react'
import { createStyles, Paper, Text, Group, Image, Stack } from '@mantine/core'
import youtube from '../../assets/images/youtube.svg'

const useStyles = createStyles((theme) => ({
    youTube: {
        background: 'rgba(41, 41, 83, 1)',
        bordeRadius: '5px',
        position: 'relative',
        zIndex: 'auto',
        boxShadow: '0px 50px 100px rgba(34, 79, 169, 0.3)',
        margin: '5rem 0',
        display: 'flex',
        alignItems: 'center',
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
}))

const BannerCard = () => {
    const { classes } = useStyles()
    return (
        <Paper
            withBorder
            radius='md'
            className={classes.youTube}
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
            </Group>
        </Paper>
    )
}

export default BannerCard
