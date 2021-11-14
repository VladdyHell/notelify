import React from 'react';

function LoginForm(props) {

	function login(event) {

		event.preventDefault();
	}

	return (
		<div>
			<section id="login-section">
				<div className="card form-container" style={{width: '480px'}}>
					<form className="card-body" action="../../account" method="post" onSubmit={(event)=>{
						props.onLogin(event)
					}}>
					  <div class="mb-3">
					    <label for="InputEmail1" class="form-label">Email address</label>
					    <input name="email" type="email" class="form-control" id="InputEmail1" aria-describedby="emailHelp" />
					    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
					  </div>
					  <div class="mb-3">
					    <label for="InputPassword1" class="form-label">Password</label>
					    <input name="password" type="password" class="form-control" id="InputPassword1" />
					  </div>
					  <div class="mb-3 form-check">
					    <input type="checkbox" class="form-check-input" id="Check" />
					    <label class="form-check-label" for="Check">Keep me logged in</label>
					  </div>
					  <button type="submit" class="btn btn-primary">Login</button>
					</form>
				</div>
			</section>
		</div>
	);
}

export default LoginForm;