import React, { useEffect } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

function NotesPage(props) {

	useEffect(async ()=>{
        props.setLoading(true);
        const status = await props.getStatus();
        props.DEBUG && console.log("Notes - Initial Status: " + status);
        try {
            props.setLoggedIn(status[0]);
        } catch (err) {
            props.DEBUG && console.log(err);
        }

        props.setLoading(false);
    }, []);

	const location = useLocation();
	// props.DEBUG && console.log('AUTH STATUS: ' + props.isLoggedIn);

	if(!props.isLoggedIn || props.isLoggedIn !== true) {
		return <Navigate to="/account" state={{from: location}} />;
	}

	return <Outlet />;
}

export default NotesPage;