import React, { Component } from "react";
import Nav from "../components/Nav";
import { Stack, Group, Title, ActionIcon, Input } from "@mantine/core";
import CreateCard from "../components/card/CreateCard";
import styled from "styled-components";
import popSmoke from "../assets/images/popSmoke.png";
import InputFileCard from "../components/card/InputFileCard";
import { Link } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons";
import FooterLinks from "../components/FooterLinks";
import ChooseCard from "../components/card/ChooseCard";

export default class ChooseImportPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: true,
        };
    }

    render() {
        return (
            <>
                <Nav isLogged={this.state.isLogged} />
                <ChooseWrapper>
                    <Stack direction='column' spacing='xl'>
                        <Group position='center'>
                            <Title style={{ fontFamily: "Gilroy" }} color='white'>
                                Choose your import lyrics method !
                            </Title>
                        </Group>

                        <Group position='center' spacing='xl'>
                            <ChooseCard />
                        </Group>


                        <Group position='center' mt={50} mb={100} >
                            <Stack
                                direction='column' spacing='xl'>
                                <Title
                                    color='white'
                                    style={{ textDecoration: "none", fontFamily: "Gilroy" }}>
                                    Enter the name of the song to search for on musixmatch
                                </Title>
                                <Input size="xl" styles={{
                                    input: { backgroundColor: "#0C1E51", border: "1px solid #3672F8" },
                                }} />

                            </Stack>

                        </Group>

                        <Link to='/choose'>
                            <Group position='center' mt={50} mb={100} >
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