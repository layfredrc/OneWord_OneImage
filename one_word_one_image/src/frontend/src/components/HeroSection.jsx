import React from "react";
import IconTwitter from "../assets/images/icon-twitter.svg";
import IconYoutube from "../assets/images/icon-youtube.svg";
import IconLaptop from "../assets/images/icon-laptop.svg";
import styled from "styled-components";
const HeroSection = () => {
	return (
		<div>

			<Content>
				<h1>
					One Word <br /> One Image
				</h1>
				<p>
					Create new content with a blazing fast solution. Powered By AI.
					<br />
					©OneWordOneOImage is here to deliver good and meaningful video
					content.
				</p>

				<button>
					<img src={IconLaptop} alt='Download' />
					Start Creating
				</button>
			</Content>

			<Social>
				<div />
				<img src={IconTwitter} alt='Twitter' />
				<img src={IconYoutube} alt='Youtube' />
			</Social>
		</div>
	);
};

const Content = styled.div`
	position: absolute;
	top: 80px;
	width: 100%;
	margin-top: 3rem;
	padding-bottom: 100px;
	pointer-events: none;
	display: flex;
	flex-direction: column;
	gap: 80px;

	@media (max-width: 1024px) {
		gap: 40px;
	}

	h1 {
		font-weight: bold;
		font-family: "Spline Sans Mono", monospace;
		font-size: 70px;
		margin: 0;
		max-width: 500px;
		pointer-events: auto;
		text-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);

		@media (max-width: 1024px) {
			font-size: 60px;
			max-width: 400px;
		}
		@media (max-width: 800px) {
			font-size: 40px;
		}
		@media (max-width: 600px) {
			padding-top: 250px;
		}
	}

	p {
		font-family: "Spline Sans Mono", monospace;
		font-weight: normal;
		line-height: 150%;
		max-width: 380px;
		pointer-events: auto;
		text-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
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

	h1,
	p,
	button {
		margin: 0 30px 0 100px;

		@media (max-width: 425px) {
			margin: 0 30px;
		}
	}
`;


const Social = styled.div`
	position: absolute;
	top: 150px;
	left: 30px;
	display: flex;
	flex-direction: column;
	gap: 30px;
	align-items: center;

	@media (max-width: 425px) {
		display: none;
	}

	div {
		width: 1px;
		height: 500px;
		background: linear-gradient(
			180deg,
			#08b6f9 0%,
			#6c56ef 33.57%,
			#1306dd 65.86%,
			#aa0eb2 100%
		);
	}
`;

export default HeroSection;
