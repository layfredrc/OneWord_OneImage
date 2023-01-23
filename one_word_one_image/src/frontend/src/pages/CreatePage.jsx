import React, { Component } from "react";
import Nav from "../components/Nav";
import { Stack, Group, Title, ActionIcon, Stepper, Button, Input, Loader } from "@mantine/core";
import CreateCard from "../components/card/CreateCard";
import ChooseCard from "../components/card/ChooseCard";
import styled from "styled-components";
import InputFileCard from "../components/card/InputFileCard";
import { IconArrowLeft, IconArrowRight, IconCheck, IconCircleCheck, IconEye, } from "@tabler/icons";
import FooterLinks from "../components/FooterLinks";
import GradientButton from "../components/button/GradientButton";
export default class CreatePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLogged: true,
			active: 0,
			highestStepVisited: this.active,
			musixMatchIsClicked: false,
			OWOIAI: false,
		};
	}


	handleStepChange = (nextStep) => {
		const isOutOfBounds = nextStep > 3 || nextStep < 0;

		if (isOutOfBounds) {
			return;
		}

		this.setState({ active: nextStep, highestStepVisited: Math.max(nextStep, this.state.highestStepVisited) })
	};

	// Allow the user to freely go back and forth between visited steps.
	shouldAllowSelectStep = (step) => this.state.highestStepVisited >= step && this.state.active !== step;

	handlemusixMatchClick = () => {
		this.setState({
			musixMatchIsClicked: true,
			OWOIAI: false,
		});
	}

	handleOWOIAIClick = () => {
		this.setState({
			musixMatchIsClicked: false,
			OWOIAI: true,
		});
	}


	render() {

		const {
			musixMatchIsClicked,
			OWOIAI,
		} = this.state;

		return (
			<div>
				<Nav isLogged={this.state.isLogged} />
				<CreateWrapper>
					<Stack direction='column' spacing='xl'>
						<Stepper px={200} my={50} active={this.state.active} onStepClick={this.handleStepChange} breakpoint="sm" size="lg">
							<Stepper.Step
								label="First step"
								description="Import audio file"
								allowStepSelect={this.shouldAllowSelectStep(0)}
							>
								<Group position='center' mt={50}>
									<Title style={{ fontFamily: "Gilroy" }} color='white'>
										What song will you use for your new clip ?
									</Title>
								</Group>

								<Group position='center' spacing='xl'>
									<InputFileCard />
								</Group>

								<Group position='center' mb='xl'>
									<GradientButton
										gradientColor='linear-gradient(93.96deg, #4F73C3 0%, #3C46A2 100%);'
										size='xl'
										radius='md'
										onClick={() => this.handleStepChange(this.state.active + 1)}
									>
										Next Step
										<ActionIcon>
											<IconArrowRight color='white' />
										</ActionIcon>
									</GradientButton>
								</Group>

							</Stepper.Step>
							<Stepper.Step
								label="Second step"
								description="Import lyrics"
								allowStepSelect={this.shouldAllowSelectStep(1)}
							>
								<Group position='center' mt={50}>
									<Title style={{ fontFamily: "Gilroy" }} color='white'>
										Choose your import lyrics method !
									</Title>
								</Group>

								<Group position='center' spacing='xl'>
									<ChooseCard
										musixmatchIsClicked={this.state.musixMatchIsClicked}
										OWOIAI={this.state.OWOIAI}
										handleOWOIAIClick={this.handleOWOIAIClick}
										handlemusixMatchClick={this.handlemusixMatchClick}
									/>
								</Group>


								<Group position='center' mt={50} my={100} >
									<Stack
										direction='column' spacing='xl'>
										{musixMatchIsClicked && (
											<>
												<Title
													color='white'
													style={{ textDecoration: "none", fontFamily: "Gilroy" }}>
													Enter the name of the song to search for on musixmatch
												</Title>
												<Input size="xl" styles={{
													input: { backgroundColor: "#0C1E51", border: "1px solid #3672F8" },
												}} />
											</>
										)}

									</Stack>

								</Group>

								<Group position='center' mb='xl'>
									<GradientButton
										variant="default"
										size='xl'
										radius='md'
										onClick={() => this.handleStepChange(this.state.active - 1)}
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
										onClick={() => this.handleStepChange(this.state.active + 1)}
									>
										Next Step
										<ActionIcon>
											<IconArrowRight color='white' />
										</ActionIcon>
									</GradientButton>
								</Group>
							</Stepper.Step>
							<Stepper.Step
								label="Final step"
								description="Generate your clip"
								allowStepSelect={this.shouldAllowSelectStep(2)}
							>
								<Group position='center' mt={50}>
									<Title style={{ fontFamily: "Gilroy" }} color='white'>
										Generate your clip with our AI powered technologies !
									</Title>
								</Group>

								<Group position='center' my={100}>
									<Loader color="indigo" size="xl" variant="oval" />
								</Group>

								<Group position='center' my={100}>
									<Stack
										direction='column' spacing='xl'>
										<Title
											color='white'
											style={{ textDecoration: "none", fontFamily: "Gilroy" }}>
											Name your clip with a title
										</Title>
										<Input size="xl" styles={{
											input: { backgroundColor: "#0C1E51", border: "1px solid #3672F8" },
										}} />
									</Stack>
								</Group>

								<Group position='center' mb='xl'>
									<GradientButton
										variant="default"
										size='xl'
										radius='md'
										onClick={() => this.handleStepChange(this.state.active - 1)}
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
										onClick={() => this.handleStepChange(this.state.active + 1)}
									>
										Next Step
										<ActionIcon>
											<IconArrowRight color='white' />
										</ActionIcon>
									</GradientButton>
								</Group>

							</Stepper.Step>

							<Stepper.Completed>
								<Group position='center' mt={50}>
									<Title style={{ fontFamily: "Gilroy" }} color='white'>
										Your clip has been successfully generated !
									</Title>
								</Group>


								<Group position='center' my={100}>
									<IconCircleCheck color='#3672F8' size={150} />
								</Group>

								<Group position='center' mb='xl'>

									<GradientButton
										gradientColor='linear-gradient(93.96deg, #4F73C3 0%, #3C46A2 100%);'
										size='xl'
										radius='md'
										onClick={() => this.handleStepChange(this.state.active + 1)}
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
		);
	}
}

const CreateWrapper = styled.div`
	position: relative;
	z-index: 1;
	margin-top: 10rem;
`;
