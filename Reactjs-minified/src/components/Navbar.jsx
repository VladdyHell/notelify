import React from "react";
import { Link } from 'react-router-dom';
import {
    Navbar,
    Nav,
    // NavDropdown,
    // Form,
    // FormControl,
    // Button,
    Container,
} from "react-bootstrap";
import { StickyNote2, AccountCircle } from "@mui/icons-material/";

function NavbarComp() {
    return (
        <>
            <style type="text/css">
                {`
			    .navbar-primary  {
					background: #F5CC0A;
					color: #fff !important;
				}
				.link-primary {
					color: #fff;
		   		}
		  `}
            </style>
            <Navbar
                variant="dark"
                expand="lg"
                className="custom-navbar navbar-primary"
            >
                <Container className="navbar-container" fluid>
                    <StickyNote2 />
                    <Navbar.Brand href="#home" className="navbar-brand-custom">
                        Notelify
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link variant="primary">
                                <Link to="/">
                                    Home
                                </Link>
                            </Nav.Link>
                            <Nav.Link variant="primary">
                                <Link to="/">
                                    Features
                                </Link>
                            </Nav.Link>
                            <Nav.Link variant="primary">
                                <Link to="/">
                                    Pricing
                                </Link>
                            </Nav.Link>
                            <Nav.Link variant="primary">
                                <Link to="/">
                                    Contact
                                </Link>
                            </Nav.Link>
                        </Nav>
                        <Link to="/notes" className="note-icon-link">
                            <StickyNote2 fontSize="large" />
                        </Link>
                        <Link to="/account" className="profile-icon-link">
                            <AccountCircle fontSize="large" color="danger" />
                        </Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavbarComp;
