import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	useLocation,
	Outlet,
} from "react-router-dom";
import { useWeb3React } from "@web3-react/core";

import Project from "./pages/Project";
import Donate from "./pages/Donate";
import ProjectDetail from "./pages/ProjectDetail";
import Test from "./pages/Test";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Manager from "./pages/Manager";
import Explorer from "./pages/Explorer";
import ScrollToTop from "./components/ScrollToTop";
import { useEagerConnect, useInactiveListener } from "./helpers/Hook";
import { injected } from "./components/Wallet";

import "./App.css";
import Container from "./components/Container";
import ProjectEdit from "./pages/ProjectEdit";

function App() {
	const { active, connector, activate } = useWeb3React();

	const [activatingConnector, setActivatingConnector] = useState();
	useEffect(() => {
		if (activatingConnector && activatingConnector === connector) {
			setActivatingConnector(undefined);
		}
	}, [activatingConnector, connector]);

	const triedEager = useEagerConnect();
	useInactiveListener(!triedEager || !!activatingConnector);

	const RequireAuth = ({ auth }) => {
		let location = useLocation();

		if (!auth) {
			return <Navigate to="/login" state={{ from: location }} />;
		}

		return <Outlet />;
	};

	return (
		<div className="App">
			<Router>
				<ScrollToTop>
					<Header />
					<Routes>
						<Route path="/login" element={<Test />} />
						<Route path="/" element={<Home />} />
						<Route path="/project" element={<Project />} />
						<Route path="/project/:address" element={<ProjectDetail />} />
						<Route path="/project/:address/edit" element={<ProjectEdit />} />
						<Route path="/project/:address/donate" element={<Donate />} />
						<Route path="/explorer" element={<Explorer />} />
						<Route path="/manager" element={<Manager />} />
					</Routes>
					<Footer />
				</ScrollToTop>
			</Router>
		</div>
	);
}

export default App;
