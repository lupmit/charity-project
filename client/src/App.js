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
import ExplorerDetail from "./pages/ExplorerDetail";
import Explorer from "./pages/Explorer";
import ScrollToTop from "./components/ScrollToTop";
import { useEagerConnect, useInactiveListener } from "./helpers/Hook";
import { useLibrary } from "./helpers/Hook";
import { getContract } from "./helpers/Contract";
import { getCharityAdress } from "./helpers/Contract";
import { getOwner } from "./api/CharityApi";
import About from "./pages/About";
import { injected } from "./components/Wallet";

import "./App.css";
import Container from "./components/Container";
import ProjectEdit from "./pages/ProjectEdit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { add } from "lodash";

function App() {
	const { active, connector, activate, account } = useWeb3React();
	const [auth, setAuth] = useState(false);
	const library = useLibrary();
	const [activatingConnector, setActivatingConnector] = useState();
	useEffect(() => {
		if (activatingConnector && activatingConnector === connector) {
			setActivatingConnector(undefined);
		}
	}, [activatingConnector, connector]);

	const triedEager = useEagerConnect();
	useInactiveListener(!triedEager || !!activatingConnector);

	const RequireAuth = () => {
		let location = useLocation();

		if (!auth) {
			return <Navigate to="/" state={{ from: location }} />;
		} else {
			return <Outlet />;
		}
	};

	useEffect(() => {
		const getOwnerAddress = async () => {
			const contract = await getContract(library, getCharityAdress());
			return await getOwner(contract);
		};

		getOwnerAddress().then((res) => {
			console.log(res);
			if (account && res === account) {
				console.log("set");
				setAuth(true);
			} else {
				setAuth(false);
			}
		});
	}, [account]);

	return (
		<div className="App">
			<Router>
				<ScrollToTop>
					<Header auth={auth} />
					<ToastContainer autoClose={2000} />
					<Routes>
						<Route path="/login" element={<Test />} />
						<Route path="/" element={<Home />} />
						<Route path="/project" element={<Project />} />
						<Route path="/about" element={<About />} />
						<Route path="/project/:address" element={<ProjectDetail />} />
						<Route path="/project/:address/donate" element={<Donate />} />
						<Route path="/explorer" element={<Explorer />} />
						<Route path="/explorer/:address" element={<ExplorerDetail />} />
						<Route path="/auth" element={<RequireAuth />}>
							<Route path="/auth/manager" element={<Manager />} />
							<Route
								path="/auth/project/:address/edit"
								element={<ProjectEdit />}
							/>
						</Route>
					</Routes>
					<Footer />
				</ScrollToTop>
			</Router>
		</div>
	);
}

export default App;
