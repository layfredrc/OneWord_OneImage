import React from "react";
import "./App.css";
import HeroSection from "./components/HeroSection";
import styled from "styled-components";
import Nav from "./components/Nav";

export default function App() {
	return (
		<Wrapper>
			<SplineContainer>
				<iframe
					src='https://my.spline.design/daccord-d61dafbf82276aebdcf77c96d1423423/'
					frameBorder='0'
					className='spline'></iframe>
			</SplineContainer>
			<Nav />
			<HeroSection />
		</Wrapper>
	);
}

const Wrapper = styled.div`
	position: relative;
	font-family: "Spline Sans", sans-serif;
	background-color: #0e1129;
	color: white;
	font-size: 16px;
	margin: 0 auto;
	position: relative;
	height: 100%;
	overflow-x: hidden;
`;

const SplineContainer = styled.div`
	position: relative;
	.spline {
		position: absolute;
		margin: 0;
		top: 0;
		right: 0;
		width: 1200px;
		height: 1000px;

		@media (max-width: 1024px) {
			transform: scale(0.8) translateX(200px);
			transform-origin: top;
		}
		@media (max-width: 800px) {
			transform: scale(0.7) translateX(600px);
		}
		@media (max-width: 600px) {
			transform: scale(0.5) translateX(-100px);
			right: auto;
			left: 50%;
			margin-left: -600px;
		}
		@media (max-width: 375px) {
			transform: scale(0.45) translateX(-50px);
		}
	}
`;
