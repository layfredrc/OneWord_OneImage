import React, { useContext } from 'react'
import Logo from '../assets/images/logo.svg'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import profile from '../assets/images/profile.svg'
import AuthContext from '../context/AuthContext'
import { IconPower } from '@tabler/icons'

const Nav = () => {
    let { user, logoutUser } = useContext(AuthContext)

    if (!user) {
        return (
            <Menu>
                <Link to='/'>
                    <li>
                        <img
                            src={Logo}
                            alt='Logo'
                        />
                    </li>
                </Link>

                <li>
                    <Link to='/feed'>Feed</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
                <li>
                    <Link to='/register'>
                        <button>Sign Up </button>
                    </Link>
                </li>
            </Menu>
        )
    } else {
        return (
            <MenuLoggedIn>
                <div className='left'>
                    <Link to='/'>
                        <li>
                            <img
                                src={Logo}
                                alt='Logo'
                            />
                        </li>
                    </Link>

                    <li>
                        <Link to='/feed'>Feed</Link>
                    </li>
                    <li>
                        <Link to='/create'>Create</Link>
                    </li>
                </div>
                <div className='right'>
                    <li>
                        <Link to='/clips'>
                            <button>
                                {user && user.username}
                                <img
                                    src={profile}
                                    alt='profile'
                                />
                            </button>
                        </Link>
                    </li>

                    <li>
                        <Link onClick={logoutUser}>
                            <button className='logout'>
                                Log out
                                <IconPower color='white' />
                            </button>
                        </Link>
                    </li>
                </div>
            </MenuLoggedIn>
        )
    }
}

const Menu = styled.ul`
    position: absolute;
    top: 30px;
    display: flex;
    gap: 30px;
    align-items: center;
    padding: 0 30px 0 100px;
    pointer-events: auto;

    li {
        list-style: none;
        margin: 0;

        a {
            text-decoration: none;
            color: white;
            padding: 8px 20px;
            border-radius: 14px;
            border: 1px solid rgba(255, 255, 255, 0);
            transition: 1s;

            :hover {
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
        }
    }

    button {
        background: rgba(0, 0, 0, 0.2);
        border: 0px;
        font-size: 16px;
        padding: 12px 30px;
        border-radius: 14px;
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.1);
        max-width: 280px;
        backdrop-filter: blur(20px);
        font-weight: 600;
        box-shadow: 0 20px 20px rgba(0, 0, 0, 0.2);
        transition: 1s;
        cursor: pointer;
        pointer-events: auto;

        display: flex;
        gap: 12px;
        justify-content: center;
        align-items: center;

        :hover {
            border: 1px solid rgba(255, 255, 255, 0.8);
            transform: translateY(-3px);
        }
    }

    @media (max-width: 600px) {
        padding: 0 0px 0 2rem;
        gap: 15px;
        /* li:nth-child(2),
		li:nth-child(3),
		li:nth-child(4),
		li:nth-child(5) {
			display: none;
		} */
    }
`

const MenuLoggedIn = styled(Menu)`
    width: 100%;
    top: 20px;
    .left {
        display: flex;
        gap: 30px;
        align-items: center;
    }

    .right {
        margin-right: 100px;
        display: flex;
        gap: 30px;
        align-items: center;
    }
    justify-content: space-between;

    @media (max-width: 600px) {
        .right {
            flex-flow: column;
            margin-top: 100px;
            gap: 0px;
        }
    }
`

export default Nav
