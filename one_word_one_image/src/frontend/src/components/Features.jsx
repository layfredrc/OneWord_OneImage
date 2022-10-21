import React from "react";
import importMusic from "../images/importMusic.svg";
import robot from "../images/robot.svg";
import newClip from "../images/newClip.svg";
import styled from "styled-components";

const Features = () => {
	return (
		<FeaturesContainer>
			<RowWrapper>
				<img src={importMusic} alt='step1' />

				<TextContent>
					<h1>01- Import your music</h1>
					<p>
						Bring your music to life. You can import your audio files directly
						or browse from MusicXMatch API or trust our AI to process your audio
						files.
					</p>
				</TextContent>
			</RowWrapper>
			<RowWrapperReverse>
				<TextContent className='left-paragraph'>
					<h1>02 - Let the magic happens</h1>
					<p>
						We will deliver language processing and smart associations with
						images. Automated Video Editing synced with lyrics.
					</p>
				</TextContent>

				<img src={robot} alt='step2' />
			</RowWrapperReverse>
			<RowWrapper>
				<img src={newClip} alt='step3' />

				<TextContent>
					<h1>03 - Enjoy your new clip </h1>
					<p>
						Your new clip is now live ! You will be able to download it and
						share it on social medias and OneWordOneImage Feed !
					</p>
				</TextContent>
			</RowWrapper>
		</FeaturesContainer>
	);
};

const RowWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	@media screen and (min-width: 768px) {
		flex-flow: row;
		justify-content: space-between;
	}

	img {
		width: 300px;
		height: 400px;
	}
`;

export const RowWrapperReverse = styled(RowWrapper)`
	flex-flow: column-reverse;
	margin-bottom: 3rem;
	@media screen and (min-width: 768px) {
		flex-flow: row;
		justify-content: space-between;
	}

	.left-paragraph {
		width: 80%;
		@media screen and (max-width: 767px) {
			width: 100%;
		}
	}
`;

const TextContent = styled.div`
	width: 100%;

	@media screen and (min-width: 768px) {
		width: 50%;
	}
	h1 {
		text-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);

		@media screen and (max-width: 767px) {
			font-size: 28px;
			font-weight: 400;
			line-height: 1.2;
			margin-bottom: 0.5rem;
			margin-top: 2rem;
		}
		@media screen and (min-width: 768px) {
			font-size: 24px;
			font-weight: 400;
			line-height: 1.2;
			margin-bottom: 0.5rem;
		}
		@media screen and (min-width: 920px) and (max-width: 1139px) {
			font-size: 28px;
			font-weight: 400;
			margin-bottom: 0.8rem;
			line-height: 1.2;
		}

		@media screen and (min-width: 1139px) {
			font-size: 42px;
			font-weight: 600;
			margin-bottom: 1rem;
			line-height: 44px;
		}
	}

	p {
		font-family: "Spline Sans Mono", monospace;
		font-size: 16px;
		line-height: 24px;
		margin-bottom: 1rem;
		width: 95%;

		@media screen and (max-width: 920px) {
			font-size: 14px;
			line-height: 1.5;
			margin-bottom: 1rem;
		}
	}
`;

const FeaturesContainer = styled.div`
	padding: 2rem;
	@media screen and (max-width: 374px) {
		padding: 0.5rem;
	}
	@media screen and (min-width: 375px) {
		padding: 2rem;
	}
	@media screen and (min-width: 768px) {
		padding: 2rem;
	}
	@media screen and (min-width: 1024px) {
		padding: 2rem 6%;
	}

	@media screen and (min-width: 1440px) {
		padding: 2rem 12%;
	}
	@media screen and (min-width: 1800px) {
		padding: 2rem 16%;
	}

	@media screen and (min-width: 2100px) {
		padding: 2rem 24%;
	}
	@media screen and (min-width: 2500px) {
		padding: 2rem 30%;
	}
`;

export default Features;
