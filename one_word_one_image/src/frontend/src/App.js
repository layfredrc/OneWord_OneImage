import React from "react";
import "./App.css";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { MantineProvider } from "@mantine/core";
export default function App() {
	return (
		<>
			<MantineProvider
				theme={{ colorScheme: "dark", fontFamily: "Gilroy" }}
				withGlobalStyles
				withNormalizeCSS>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/register' element={<SignUpPage />} />
					<Route path='/login' element={<LoginPage />} />
				</Routes>
			</MantineProvider>
		</>
	);
}
