import React, {useState, useEffect}from 'react'
import { Switch, Route, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import role from './role.js'
import HeaderContainer from '../containers/HeaderContainer'
import Signup from './Login/Signup'
import Main_Sidebar from '../components/Sidebar'

function Full(props){
  if(!window.sessionStorage.getItem('user')){
    return <Redirect push to="/login" />
  }else{
    return (
      <div>
        <HeaderContainer />
        <Switch>
          {role.role.route.map((route) => {
            return <Route exact path={route.path} name={route.name} component={route.component}/>
          })}
          <Redirect from="/" to="/Homepath" />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: (body) => {
		dispatch({type: 'LOGIN', payload: body})
	}
})
export default connect(mapStateToProps, mapDispatchToProps)(Full)