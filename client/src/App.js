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
import ProjectDetail from "./pages/ProjectDetail";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Header from "./components/Header";
import Manager from "./pages/Manager";
import { useEagerConnect, useInactiveListener } from "./helpers/Hook";

import "./App.css";
import Container from "./components/Container";

function App() {
	const { active, connector } = useWeb3React();

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
			<Container>
				<Header />
				<Router>
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route element={<RequireAuth auth={active} />}>
							<Route path="/project" element={<Project />} />
							<Route path="/project/:address" element={<ProjectDetail />} />
							<Route path="/admin" element={<Admin />} />
							<Route path="/manager" element={<Manager />} />
						</Route>
					</Routes>
				</Router>
			</Container>
		</div>
	);
}

export default App;
