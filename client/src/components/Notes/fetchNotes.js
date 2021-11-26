import React from 'react';

const DEBUG = false;

async function fetchNotes() {
	let res;
	let data;
	try {
		res = await fetch('http://localhost:8080/noteoperation', {
			method: 'GET',
			credentials: 'include'
		});
		data = await res.json();
		if (res.ok) {
			DEBUG && console.log('Successfully fetched notes');
		} else {
			DEBUG && console.log('Fetch Note Failed');
		}
	} catch (err) {
		DEBUG && console.log(err);
	}
	DEBUG && console.log(data);
	// setNotes(data);
	return data;
}

export default fetchNotes;