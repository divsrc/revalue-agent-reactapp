import React from 'react'
import logoImage from './white-logo.png'
import './App.css'
import { BrowserRouter, Route} from 'react-router-dom'
import history from './history.js'

import Login from './pages/login.js'
import ForgotPassword from './pages/forgotpassword.js'
import Register from './pages/register.js'
import Register2 from './pages/register2.js'
import Axios from './pages/axios.js'
import Test from './pages/test.js'

class App extends React.Component{
  componentDidMount() {
    history.push('/')
  }

  render() {
    return(
      <BrowserRouter history={history}>
        <div className="App">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-5 col-centered larger-box centered">
                <div className="white-logo-div">
                  <img className="white-logo" alt="ReValue logo" src={logoImage} />
                </div>
                <div className="arrow-down col-centered" />
                <br />

                <div className="App-content">
                  <div className="Login">
                    <Route exact path="/" component={Login} />
                    <Route path="/forgotpassword" component={ForgotPassword} />
                    <Route path="/register" component={Register} />
                    <Route path="/register2" component={Register2} />
                    <Route path="/axios" component={Axios} />
                    <Route path="/test" component={Test} />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
