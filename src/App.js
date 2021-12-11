import Full from './containers/Full'
import {Switch, Route} from 'react-router-dom'
import Login from './containers/Login/login'
import Signup from './containers/Login/Signup'
function App() {
  return (
    <Switch>
      <Route exact path="/signup" name="Signup" component={Signup} />
      <Route exact path="/login" name="Login" component={Login} />
      <Route path="/" name="Full" component={Full} />
    </Switch>
  )
}

export default App;