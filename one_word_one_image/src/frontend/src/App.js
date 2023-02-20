import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { MantineProvider } from "@mantine/core";
import FeedPage from "./pages/FeedPage";
import CreatePage from "./pages/CreatePage";
import { AuthProvider } from "./context/AuthContext";
import ClipsPage from './pages/ClipsPage';


export default function App() {
	return (
		<>
			<MantineProvider
				theme={{ colorScheme: "dark", fontFamily: "Gilroy" }}
				withGlobalStyles
				withNormalizeCSS>
				<AuthProvider>
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/feed' element={<FeedPage />} />
						<Route path='/create' element={<CreatePage />} />
						<Route path='/register' element={<SignUpPage />} />
						<Route path='/login' element={<LoginPage />} />
						<Route path="/clips" element={<ClipsPage />} />
					</Routes>
				</AuthProvider>

			</MantineProvider>
		</>
	);
}
