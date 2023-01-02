import React, { Component } from "react";
import Nav from "../components/Nav";
import { Footer, Stack } from "@mantine/core";

import styled from "styled-components";

import FeedCard from "../components/card/FeedCard";
import FooterLinks from "../components/FooterLinks";

export default class FeedPage extends Component {
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
				<FeedWrapper>
					<Stack
						justify='apart'
						align='center'
						spacing='xl'
						style={{
							position: "relative",
							zIndex: 1,
						}}>
						<FeedCard thumbnail='https://imageio.forbes.com/specials-images/imageserve/5dc59d5fb4d5050007a52962/Astroworld-Festival/960x0.jpg?format=jpg&width=960' />
						<FeedCard thumbnail='https://wave.fr/images/1916/10/rolling-loud-europe-2021-2.jpg' />
						<FeedCard thumbnail='https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA120Fx0.img?h=0&w=600&m=6&q=60&u=t&o=f&l=f' />
					</Stack>
				</FeedWrapper>
				<FooterLinks />
			</div>
		);
	}
}

const FeedWrapper = styled.div`
	position: relative;
	z-index: 1;
	margin-top: 10rem;
`;
