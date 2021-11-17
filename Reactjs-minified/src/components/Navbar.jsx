import React from 'react';
import { 
		Navbar, 
		Nav, 
		NavDropdown, 
		Form, 
		FormControl, 
		Button,
		Container
	} from 'react-bootstrap';

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
		  <Navbar variant="dark" expand="lg" className="navbar-custom navbar-primary">
			  	<Navbar.Brand href="#home" className="navbar-brand-custom">Notelify</Navbar.Brand>
			  	<Navbar.Toggle aria-controls="basic-navbar-nav" />
			  	<Navbar.Collapse id="basic-navbar-nav">
			    <Nav className="mr-auto">
			      <Nav.Link href="#home" variant="primary">Home</Nav.Link>
			      <Nav.Link href="#link">Features</Nav.Link>
			      <Nav.Link href="#link">Pricing</Nav.Link>
			      <Nav.Link href="#link">Conctact</Nav.Link>
			    </Nav>
		  </Navbar.Collapse>
		</Navbar>
		</>
	);
}

export default NavbarComp;