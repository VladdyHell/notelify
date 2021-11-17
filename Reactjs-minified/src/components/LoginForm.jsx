import React, { useState } from 'react';

function LoginForm(props) {
	const [textInput, setTextInput] = useState({
		username: '',
		password: ''
	});

	function handleChange(event) {
		const { name, value } = event.target;

		return setTextInput((prevVal) => {
			return {
				...prevVal,
				[name]: value
			}
		});
		console.log(textInput);
	}

	return (
		<div>
			<section id="login-section">
				<div className="card form-container" style={{width: '480px'}}>
					<form name="login" className="card-body" /*action="../../login" method="post"*/ onSubmit={(event)=>{
						props.onLogin(event)
					}}>
					  <div class="mb-3">
					    <label for="InputEmail1" class="form-label">Email address</label>
					    <input onChange={handleChange} value={textInput.username} name="username" type="email" class="form-control" id="InputEmail1" aria-describedby="emailHelp" />
					    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
					  </div>
					  <div class="mb-3">
					    <label for="InputPassword1" class="form-label">Password</label>
					    <input onChange={handleChange} value={textInput.password} name="password" type="password" class="form-control" id="InputPassword1" />
					  </div>
					  <div class="mb-3 form-check">
					    <input name="keepLoggedIn" type="checkbox" class="form-check-input" id="Check" />
					    <label class="form-check-label" for="Check">Keep me logged in</label>
					  </div>
					  <button type="submit" class="btn btn-primary">Login</button>
					</form>
					{/*<button onClick={()=>props.onGetStatus()} class="btn btn-secondary-analogous">Get Status</button>*/}
				</div>
			</section>
		</div>
	);
}

export default LoginForm;