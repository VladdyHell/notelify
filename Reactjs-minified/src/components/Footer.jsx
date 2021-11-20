import React from 'react';

function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer>
			Copyright &copy; Vladd Cantor {year} 
		</footer>
	);
}

export default Footer;