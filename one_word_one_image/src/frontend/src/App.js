import { Title } from "@mantine/core";
import FooterLinks from "./components/footer/FooterLinks";
import HeaderMegaMenu from "./components/header/HeaderMegaMenu";

function App() {
	return (
		<div className='App'>
			<HeaderMegaMenu />
			<Title>One Word One Image</Title>
			<FooterLinks />
		</div>
	);
}

export default App;
