import "./App.css";
import Header from "./components/Header";
import Project from "./pages/Project";
import Container from "./components/Container";
import Tab from "./components/Tab";

function App() {
	return (
		<div className="App">
			<Container>
				<Header />
				<Project />
				<Tab />
			</Container>
		</div>
	);
}

export default App;
