import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button'
import bg from '../../bg.jpg'
import agent from '../../agent';

function Login(props) {
  let history = useHistory();
  const [login , setLogin ]= useState(0);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const handleLogin = async (e) => {
		e.preventDefault()
		const params = {
			email: email,
			password: password
		}
		try{
			const {data} = await agent.Auth.login(params)
			console.log(data)
			if(data.success){
				window.sessionStorage.setItem('user',JSON.stringify(data.data))
				props.onSubmit(data.data)
				history.push('/')
			}
		}
		catch(err){
			console.log(err)
			throw err
		}
		 
	}
  function goSignUp(){
    history.push("/signup");
	}

  return (
<div class="container-fluid container_login">
<h1 class="title1">NTU Grouping</h1>
	<div class="d-flex justify-content-center h-100">
		<div class="card">
			<div class="card-header">
				<h3>Sign In</h3>
				<div class="d-flex justify-content-end social_icon">
					<span><i class="fab fa-facebook-square"></i></span>
					<span><i class="fab fa-google-plus-square"></i></span>
					<span><i class="fab fa-twitter-square"></i></span>
				</div>
			</div>
			<div class="card-body">
				<form onSubmit={handleLogin}>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-user"></i></span>
						</div>
						<input type="text" class="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email"/>
						
					</div>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-key"></i></span>
						</div>
						<input type="password" class="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password"/>
					</div>
					<div class="form-group login-group">
						<Button type="submit" value="Login" class="login_btn ">
              Login
            </Button>
					</div>
				</form>
			</div>
			<div class="card-footer">
				<div class="d-flex justify-content-center links">
					Don't have an account?<a href="" onClick={goSignUp}>Sign Up</a>
				</div>
				<div class="d-flex justify-content-center">
					<a href="#">Forgot your password?</a>
				</div>
			</div>
		</div>
	</div>
    <div className="bg">
      <img src={bg} />
    </div>
</div>
  )
}
const mapStateToProps = state => ({
	currentUser: state.auth.currentUser
})
const mapDispatchToProps = dispatch => ({
	onSubmit: (body) => {
		dispatch({type: 'LOGIN', payload: body})
	}
})
export default connect(mapStateToProps,mapDispatchToProps)(Login);