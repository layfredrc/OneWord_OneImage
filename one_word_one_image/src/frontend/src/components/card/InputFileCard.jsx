import React, { useState, useRef } from "react";
import { createStyles, Paper, Text, Group, Image, Stack, Button, read } from "@mantine/core";
import { IconX, IconDownload } from "@tabler/icons";
import { Dropzone } from '@mantine/dropzone';
import styled from "styled-components";
import illustration from "../../assets/images/import.svg";
import CreateCard from "./CreateCard";
import logo from "../../assets/images/logo.svg";
import newClip from "../../assets/images/newClip.svg";
const musicMetadata = require('music-metadata-browser');


const useStyles = createStyles((theme) => ({
	card: {
		background: "rgba(41, 41, 83, 1)",
		bordeRadius: "5px",
		position: "relative",
		zIndex: "auto",
		boxShadow: "0px 50px 100px rgba(34, 79, 169, 0.3)",
		width: "500px",
		margin: "5rem 0",
	},

	wrapper: {
		position: 'relative',
		marginBottom: 30,
	},

	dropzone: {
		background: "transparent",
		borderWidth: 0,
		paddingBottom: 50,

		'&:hover': {
			background: "transparent",
		}
	},


	control: {
		position: 'absolute',
		width: 250,
		left: 'calc(50% - 125px)',
		bottom: -20,
		fontWeight: 500,
	},

}));

const InputFileCard = () => {
	const { classes, theme } = useStyles();
	const openRef = useRef(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const [selectedFileCover, setSelectedFileCover] = useState(null);
	const [selectedFileTitle, setSelectedFileTitle] = useState(null);
	const [selectedFileArtist, setSelectedFileArtist] = useState(null);

	const onDrop = async (acceptedFiles) => {
		// Update the selectedFile state with the accepted file
		console.log(acceptedFiles[0])
		setSelectedFile(acceptedFiles[0]);



		const metadata = await musicMetadata.parseBlob(acceptedFiles[0]);
		console.log(metadata)
		const cover = musicMetadata.selectCover(metadata.common.picture);
		console.log(cover)

		const coverFormated = URL.createObjectURL(
			new Blob([cover.data], { type: 'image/png' } /* (1) */)
		);

		console.log(coverFormated)


		const artist = metadata.common.artist;
		const title = metadata.common.title;

		setSelectedFileCover(coverFormated);
		setSelectedFileTitle(title);
		setSelectedFileArtist(artist);


	}
	return (
		<Group position='center' spacing='xl'>
			<Paper withBorder radius='md' className={classes.card} p={20}>
				<div className={classes.wrapper}>
					<Dropzone
						openRef={openRef}
						onDrop={onDrop}
						onReject={(files) => console.log("rejected files", files)}
						className={classes.dropzone}
						radius='md'
						name="file"
						multiple={false}
						accept={['audio/mpeg', 'audio/wav']}
						maxSize={30 * 1024 ** 2}>
						<div style={{ pointerEvents: "none" }}>
							<Group position='center'>
								<Dropzone.Accept>
									<IconDownload size={50} color='#4364F7' stroke={1.5} />
								</Dropzone.Accept>
								<Dropzone.Reject>
									<IconX
										size={50}
										color={theme.colors.red[6]}
										stroke={1.5}
									/>
								</Dropzone.Reject>
								<Dropzone.Idle>
									<Group mt='sm' position='center'>
										<Image src={illustration} width={300} height={400} fit='contain' />
									</Group>
								</Dropzone.Idle>
							</Group>

							<Text align='center' weight={700} size='lg' mt='xl'>
								<Dropzone.Accept>Drop files here</Dropzone.Accept>
								<Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
								<Dropzone.Idle>Upload Audio file</Dropzone.Idle>
							</Text>

							{selectedFile ? (
								<Text align='center' size='sm' mt='xs' color='dimmed'>
									{selectedFile.name}
								</Text>
							) :
								(
									<Text align='center' size='sm' mt='xs' color='dimmed'>
										Import audio files from your local devices .mp3 / .wav
									</Text>
								)
							}
						</div>
					</Dropzone>

					<Button
						className={classes.control}
						size='md'
						radius='xl'
						onClick={() => openRef.current?.()}>
						Select files
					</Button>
				</div>
			</Paper>

			<CreateCard
				cover={selectedFileCover ? selectedFileCover : newClip}
				title={selectedFileTitle ? selectedFileTitle : "Title of the audio file"}
				artist={selectedFileArtist ? selectedFileArtist : "Artist of the audio file"}

			/>
		</Group>

	);
};

export default InputFileCard;

export const GradientContainer = styled.div`
	margin-top: 3rem;
	background: #fcfcfd;
	border-radius: 5px;
	position: relative;
	padding: 3.5rem;
	z-index: auto;
	@media screen and (max-width: 860px) {
		padding: 1.5rem;
	}

	:before {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: -1;
		margin: -5px;
		border-radius: 8px;
		background: linear-gradient(117.03deg, #3672f8 0%, #b01eff 100%);
		@media screen and (max-width: 375px) {
			margin: -2px;
		}
	}

	@media screen and (max-width: 375px) {
		padding: 1rem;
	}
`;
