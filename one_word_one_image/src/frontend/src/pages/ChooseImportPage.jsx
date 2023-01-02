import React, { Component } from "react";
import Nav from "../components/Nav";
import { Footer, Stack, Group, Title, ActionIcon } from "@mantine/core";
import CreateCard from "../components/card/CreateCard";
import styled from "styled-components";
import popSmoke from "../assets/images/popSmoke.png";
import InputFileCard from "../components/card/InputFileCard";
import { Link } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons";
import FooterLinks from "../components/FooterLinks";


export default class ChooseImportPage extends Component {
    render() {
        return (
            <>
                <Nav isLogged={this.state.isLogged} />
                <ChooseWrapper>
                    <Stack direction='column' spacing='xl'>
                        <Group position='center'>
                            <Title style={{ fontFamily: "Gilroy" }} color='white'>
                                What song will you use for your new clip ?
                            </Title>
                        </Group>

                        <Group position='center' spacing='xl'>
                            <InputFileCard />
                            <CreateCard thumbnail={popSmoke} />
                        </Group>

                        <Link to='/choose'>
                            <Group position='center'>
                                <Title
                                    color='white'
                                    style={{ textDecoration: "none", fontFamily: "Gilroy" }}>
                                    Next Step
                                </Title>
                                <ActionIcon>
                                    <IconArrowRight color='white' />
                                </ActionIcon>
                            </Group>
                        </Link>
                    </Stack>
                </ChooseWrapper>
                <FooterLinks />
            </>
        )
    }
}

const ChooseWrapper = styled.div`
    position: relative;
    margin-top: 10rem;
    z-index: 1;
`