import React, { useState } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../main.scss';
import NavbarComp from './Navbar';
import LoginForm from './LoginForm';
import status from '../status.js';

// console.log(status.getStatus);

function App() {
	const [isLoggedIn, setLoggedIn] = useState(status.getStatus);
	// setInterval(()=>console.log(isLoggedIn), 1000);
	// setInterval(()=>console.log(status.getStatus), 1000);
	function handleStatus(event) {
		const queryString = new URLSearchParams(new FormData(event.target)).toString()
		const data = new FormData(event.target);
		const value = Object.fromEntries(data.entries());

		console.log(value);

		event.preventDefault();
		fetch('./account', {
			method: 'POST',
			headers: {
			    'Content-Type': 'application/x-www-form-urlencoded'
			},
			// body: new URLSearchParams(Object.entries(value)).toString()
			body: queryString
		}).then((res)=>{
			res.ok ? console.log('Request Success') : console.log('Request Failed');
		});
		setLoggedIn(status.getStatus);
		console.log(status.getStatus);
	}

	return (
		<div>
			<p style={{paddingLeft: '15px'}}>Login Status: {isLoggedIn.toString()}</p>
			<NavbarComp />
			{!isLoggedIn || isLoggedIn === false 
				? <LoginForm /*onLogin={handleStatus}*/ /> 
				: (
					<div>
						<h1>Welcome!</h1>
						<form action="../../logout" method="post">
							<button type="submit">
								Logout
							</button>
						</form>
					</div>
				)
			}
		</div>
	);
}

export default App;