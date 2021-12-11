import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import bg from "../../bg.jpg";
import agent from "../../agent";

function Signup(props) {

  const history = useHistory()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [grade, setGrade] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirm, setConfirm] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = {
      email: email,
      password: password,
      department: department,
      grade: grade,
      username: lastName + firstName,
    };
    console.log(params);
    try {
      const {data} = await agent.Auth.register(params);
      if (data.success) {
        window.sessionStorage.setItem('user', JSON.stringify(data.data))
        props.onSubmit(data.data)
        history.push('/')
      }
    } catch (err) {
      console.log(err);
      throw err;
    }

  };
  return (
    <div class="container-fluid" id="wrap">
      <h1 class="title"> NTU Grouping</h1>
      <div class="row justify-content-center">
        <div class="col-md-6 col-md-offset-3">
          <form class="form toCenter" onSubmit={handleSubmit}>
            {" "}
            <legend>Sign Up</legend>
            <div class="row">
              <div class="col-xs-6 col-md-6">
                <input
                  type="text"
                  name="firstname"
                  class="form-control input-lg"
                  placeholder="First Name"
                  value={firstName}
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div class="col-xs-6 col-md-6">
                <input
                  type="text"
                  name="lastname"
                  class="form-control input-lg"
                  placeholder="Last Name"
                  value={lastName}
                  required
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div class="row">
              <div class="col-xs-6 col-md-6">
                <input
                  type="text"
                  name="major"
                  class="form-control input-lg"
                  placeholder="系"
                  required
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>
              <div class="col-xs-6 col-md-6">
                <input
                  type="text"
                  name="grade"
                  class="form-control input-lg"
                  placeholder="年級"
                  required
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                />
              </div>
            </div>
            <input
              type="text"
              name="email"
              class="form-control input-lg"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              class="form-control input-lg"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              name="confirm_password"
              class="form-control input-lg"
              placeholder="Confirm Password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <br />
            <button
              className="btn btn-lg btn-primary btn-block signup-btn"
              type="submit"
            >
              Create my account
            </button>
          </form>
        </div>
      </div>
      <div className="bg">
        <img src={bg} />
      </div>
    </div>
  );
}
const mapStateToProps = state => ({
	currentUser: state.auth.currentUser
})
const mapDispatchToProps = dispatch => ({
	onSubmit: (user) => {
		dispatch({type: 'LOGIN', payload: user})
	}
})
export default connect(mapStateToProps,mapDispatchToProps)(Signup);
