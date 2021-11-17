import React, { useState } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../main.scss';
import LoadingScreen from './LoadingScreen';
import Navbar from './Navbar';
import LoginForm from './LoginForm';
import Tabs from './Tabs';
import Notes from './Notes';

function App() {

	async function login(queryString) {
		let res;
		let data;
		try {
			res = await fetch('http://localhost:8080/login', {
				method: 'POST',
				headers: {
				    'Content-Type': 'application/x-www-form-urlencoded',
				    'Access-Control-Allow-Credentials': true,
				    'Access-Control-Allow-Origin': 'http://localhost:8080'
				},
				body: queryString,
				credentials: 'include'
			});
			data = await res.json();
			if(res.ok) { 
				console.log('Authorization Success') 
			} else {
				console.log('Authorization Failed');
			}

		} catch (err) {
			console.log(err);
		}
		return data;
	}

	async function logout() {
		let res
		try {
			res = await fetch('http://localhost:8080/logout', {
				method: 'POST',
				headers: {
					'Access-Control-Allow-Credentials': true
				},
				credentials: 'include'
			});
			console.log(res);
		} catch (err) {
			console.log(err);
		}
		return res;
	}

	async function getStatus() {
		let res;
		let data;
		try{
			res = await fetch('http://localhost:8080/checkauth', {
				method: 'GET',
				headers: {
				    'Access-Control-Allow-Credentials': true
				},
				credentials: 'include'
			});
			data = await res.json();
			if(res.ok) {
				console.log('Status Request Success')
				// setLoggedIn(res)
				console.log(res)
			} else { 
				console.log('Status Request Failed');
			}
		} catch(err) {
			console.log(err);
		}
		console.log(data);
		return data;
	}

	const [isLoading, setLoading] = useState(true);
	const [isLoggedIn, setLoggedIn] = useState(async () => {
		const status = await getStatus();
		console.log('Initial Status: ' + status);
		setLoggedIn(status);
		setLoading(false);
	});

	async function handleStatus(event) {
		const { name } = event.target;
		console.log('Form Name: ' + name);
		const queryString = new URLSearchParams(new FormData(event.target)).toString()
		console.log('Form Data: ' + queryString);

		event.preventDefault();
		try {
			if (name === 'login') {
				setLoading(true);
				const res = await login(queryString);
				// const data = await res.json();
				console.log('Logged in ' + res.data);
				setLoading(false);
			} else if (name === 'logout'){
				setLoading(true);
				await logout();
				console.log('Logged Out');
				setLoading(false);
			} else {
				console.log('Invalid operation');
			}
			setLoading(true);
			const status = await getStatus();
			// const status = resStatus.json();
			setLoggedIn(status);
			setLoading(false);
		} catch(err) {
			console.log(err);
		}
	}

	return (
		<div id='react-root'>
			<LoadingScreen displayProp={isLoading} />
			{/*<Tabs />*/}
			<Navbar />
			{
				!isLoggedIn || isLoggedIn !== true 
				? <LoginForm onLogin={handleStatus} onGetStatus={getStatus} /> 
				: <Notes onLogout={handleStatus} />
			}
		</div>
	);
}

export default App;