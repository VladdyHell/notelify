import React from 'react';

function  Notes(props) {
	return (
		<div>
			<h1>Welcome!</h1>
			<form name="logout" onSubmit={(e)=>props.onLogout(e)} method="post">
				<button type="submit">
					Logout
				</button>
			</form>
		</div>
	);
}

export default Notes;