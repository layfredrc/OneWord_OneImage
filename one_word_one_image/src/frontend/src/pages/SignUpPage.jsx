import {
    Paper,
    createStyles,
    TextInput,
    PasswordInput,
    Title,
    Text,
    Anchor,
} from '@mantine/core'

import styled from 'styled-components'
import Logo from '../assets/images/logo.svg'
import GradientButton from '../components/button/GradientButton'
import { Link } from 'react-router-dom'
import FooterLinks from '../components/FooterLinks'
import AuthContext from '../context/AuthContext'
import React, { useContext } from 'react'

const useStyles = createStyles((theme) => ({
    wrapper: {
        minHeight: 900,
        minWidth: '67%',
        backgroundSize: 'cover',
        backgroundImage:
            'url(https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=20)',

        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            minWidth: '0%',
        },
    },

    form: {
        borderRight: `1px solid ${
            theme.colorScheme === 'dark'
                ? theme.colors.dark[7]
                : theme.colors.gray[3]
        }`,
        minHeight: 1000,
        minWidth: '33%',
        paddingTop: 80,
        backgroundColor: '#0E1129',

        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            minWidth: '100%',
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    logo: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        width: 120,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}))

export default function LoginPage() {
    const { classes } = useStyles()
    const { signUpUser } = useContext(AuthContext)
    return (
        <>
            <form onSubmit={signUpUser}>
                <RowWrapper>
                    <Paper
                        className={classes.form}
                        radius={0}
                        py={30}
                        px={80}
                    >
                        <LogoContainer to='/'>
                            <img
                                src={Logo}
                                alt='Logo'
                            />
                            <h2>OneWordOneImage</h2>
                        </LogoContainer>

                        <Title
                            order={1}
                            className={classes.title}
                            mt={50}
                            mb={50}
                            weight={500}
                        >
                            Let's Get Started !
                        </Title>

                        <TextInput
                            label='Email address'
                            placeholder='hello@gmail.com'
                            name='email'
                            size='xl'
                            labelProps={{ mb: 10 }}
                            styles={{
                                input: {
                                    backgroundColor: '#0C1E51',
                                    border: '1px solid #3672F8',
                                },
                            }}
                            radius='lg'
                        />
                        <TextInput
                            label='Username'
                            placeholder='username'
                            name='username'
                            size='xl'
                            labelProps={{ my: 20 }}
                            styles={{
                                input: {
                                    backgroundColor: '#0C1E51',
                                    border: '1px solid #3672F8',
                                },
                            }}
                            radius='lg'
                        />
                        <PasswordInput
                            label='Password'
                            placeholder='Your password'
                            name='password'
                            labelProps={{ mb: 10 }}
                            styles={{
                                input: {
                                    backgroundColor: '#0C1E51',
                                    border: '1px solid #3672F8',
                                },
                            }}
                            radius='lg'
                            size='xl'
                            mt={30}
                            mb={50}
                        />
                        <PasswordInput
                            label='Confirm Password'
                            placeholder='Your password'
                            labelProps={{ mb: 10 }}
                            styles={{
                                input: {
                                    backgroundColor: '#0C1E51',
                                    border: '1px solid #3672F8',
                                },
                            }}
                            radius='lg'
                            size='xl'
                            mt={30}
                            mb={50}
                        />
                        <GradientButton
                            gradientColor='linear-gradient(117.03deg, #3672F8 0%, #B01EFF 100%)'
                            type='submit'
                            size='xl'
                            radius='md'
                            fullWidth
                        >
                            Register
                        </GradientButton>

                        <Text
                            align='center'
                            size='lg'
                            mt='md'
                            weight={500}
                        >
                            Already have an account?{' '}
                            <Anchor
                                href='/login'
                                weight={500}
                            >
                                Sign In
                            </Anchor>
                        </Text>
                    </Paper>
                    <div className={classes.wrapper}></div>
                </RowWrapper>
                <FooterLinks />
            </form>
        </>
    )
}

const RowWrapper = styled.div`
    display: flex;
`

export const LogoContainer = styled(Link)`
    display: flex;
    line-height: 3;
    gap: 1rem;

    color: white;
    text-decoration: none;
`
