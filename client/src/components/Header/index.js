import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import Container from "../Container";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

const Header = (props) => {
	return (
		<div className={styles.headerFixed}>
			<Container>
				<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
					<Navbar.Brand as={Link} to="/">
						Charity Project
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link as={Link} to="/project">
								All Project
							</Nav.Link>
							<Nav.Link as={Link} to="/manager">
								Manager
							</Nav.Link>
							<Nav.Link as={Link} to="/admin">
								Admin
							</Nav.Link>
						</Nav>
						<Nav>
							<Nav.Link href="#deets">MyWallet</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</Container>
		</div>
	);
};

export default Header;
