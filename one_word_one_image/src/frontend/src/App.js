import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { MantineProvider } from "@mantine/core";
import FeedPage from "./pages/FeedPage";
import CreatePage from "./pages/CreatePage";
import ChooseImportPage from "./pages/ChooseImportPage";
export default function App() {
	return (
		<>
			<MantineProvider
				theme={{ colorScheme: "dark", fontFamily: "Gilroy" }}
				withGlobalStyles
				withNormalizeCSS>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/feed' element={<FeedPage />} />
					<Route path='/create' element={<CreatePage />} />
					<Route path='/choose' element={<ChooseImportPage />} />
					<Route path='/register' element={<SignUpPage />} />
					<Route path='/login' element={<LoginPage />} />
				</Routes>
			</MantineProvider>
		</>
	);
}
