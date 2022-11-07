import {
	Paper,
	createStyles,
	TextInput,
	PasswordInput,
	Button,
	Title,
	Text,
	Anchor,
} from "@mantine/core";

import styled from "styled-components";
import { LogoContainer } from "./SignUpPage";
import Logo from "../assets/images/logo.svg";
import GradientButton from "../components/button/GradientButton";

const useStyles = createStyles((theme) => ({
	wrapper: {
		minHeight: 900,
		minWidth: "67%",
		backgroundSize: "cover",
		backgroundImage:
			"url(https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80)",

		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			minWidth: "0%",
		},
	},

	form: {
		borderRight: `1px solid ${theme.colors.dark[7]}`,
		minHeight: 930,
		minWidth: "33%",
		paddingTop: 80,
		colors: theme.white,
		backgroundColor: "#0E1129",

		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			minWidth: "100%",
		},
	},

	title: {
		color: theme.white,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
	},

	logo: {
		color: theme.white,
		width: 120,
		display: "block",
		marginLeft: "auto",
		marginRight: "auto",
	},
}));

export default function LoginPage() {
	const { classes } = useStyles();
	return (
		<RowWrapper>
			<Paper className={classes.form} radius={0} py={30} px={80}>
				<LogoContainer to='/'>
					<img src={Logo} alt='Logo' />
					<h2>OneWordOneImage</h2>
				</LogoContainer>

				<Title order={1} className={classes.title} mt={50} mb={50}>
					Sign In to your account !
				</Title>

				<TextInput
					label='Email address'
					placeholder='hello@gmail.com'
					size='xl'
					labelProps={{ mb: 10 }}
					styles={{
						input: { backgroundColor: "#0C1E51", border: "1px solid #3672F8" },
					}}
					radius='lg'
				/>
				<PasswordInput
					label='Password'
					placeholder='Your password'
					labelProps={{ mb: 10 }}
					styles={{
						input: { backgroundColor: "#0C1E51", border: "1px solid #3672F8" },
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
					fullWidth>
					Log In
				</GradientButton>

				<Text align='center' mt='md' size='lg' color='white'>
					Don&apos;t have an account?{" "}
					<Anchor
						href='#'
						weight={700}
						onClick={(event) => event.preventDefault()}>
						Register
					</Anchor>
				</Text>
			</Paper>
			<div className={classes.wrapper}></div>
		</RowWrapper>
	);
}

const RowWrapper = styled.div`
	display: flex;
`;