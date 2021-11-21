import React, { useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';

import { StickyNote2, AccountCircle } from "@mui/icons-material/";

import {
    Navbar,
    Nav,
    // NavDropdown,
    // Form,
    // FormControl,
    Button,
    Container,
} from "react-bootstrap";

import ProfileIcon from './NavbarProfileIcon';

function NavbarComp(props) {
    const location = useLocation();

    useEffect(async () => {
        props.setLoading(true);
        const status = await props.getStatus();
        props.DEBUG && console.log(`Navbar - Status: ${status}`);
        try {
            props.setLoggedIn(status[0]);
        } catch(err) {
            props.DEBUG && console.log(err);
        }
        props.setLoading(false);
    }, []);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                        <Navbar.Brand className="navbar-brand-custom">
                            <Link to="/">
                                <StickyNote2 />
                                Notelify
                            </Link>
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
                        {/*<Link to="/notes" className="note-icon-link">
                            <StickyNote2 fontSize="large" />
                        </Link>*/}
                        {
                            !props.isLoggedIn || props.isLoggedIn !== true ? (
                                <Link to="/account" className="profile-icon-link">
                                    <Button variant="tertiary-analogous">Signin</Button>
                                </Link>
                            ) : (
                                <ProfileIcon onLogout={props.onLogout} />
                            ) 
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavbarComp;
