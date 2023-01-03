import React, { Component } from "react";
import Nav from "../components/Nav";
import { Stack, Group, Title, ActionIcon } from "@mantine/core";
import CreateCard from "../components/card/CreateCard";
import styled from "styled-components";
import popSmoke from "../assets/images/popSmoke.png";
import InputFileCard from "../components/card/InputFileCard";
import { Link } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons";
import FooterLinks from "../components/FooterLinks";
export default class CreatePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLogged: true,
		};
	}

	render() {
		return (
			<div>
				<Nav isLogged={this.state.isLogged} />
				<CreateWrapper>
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
							<Group position='center' mb='xl'>
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
				</CreateWrapper>
				<FooterLinks />
			</div>
		);
	}
}

const CreateWrapper = styled.div`
	position: relative;
	z-index: 1;
	margin-top: 10rem;
`;
