import React, { useEffect } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

function AuthPage(props) {

	useEffect(async () => {
		props.setLoading(true);
		const status = await props.getStatus();
		console.log('AuthPage - Initial Status: ' + status);
		try {
			props.setLoggedIn(status[0]);
		} catch (err) {
			console.log(err);
		}
		props.setLoading(false);
	}, []);

	const location = useLocation();

	if (props.isLoggedIn) {
			return <Navigate to='/notes' state={{from: location}} />
	}
	return <Outlet />
}

export default AuthPage;