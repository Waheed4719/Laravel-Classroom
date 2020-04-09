import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './UI/Header'
import Classes from './Classes'
import './../../sass/root.scss'
// import SideBar from './Sidebar'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab} from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {Provider} from 'react-redux'
import setAuthToken from './../utils/setAuthToken'
import store from './../store'
import Login from './Login'
import Register from './Register'
import FacLogin from './Faculty/FacLogin'
import FacRegister from './Faculty/FacRegister'
import jwtDecode from 'jwt-decode'
import * as Types from './../actions/types'
import Landing from './Landing'
import {message} from 'antd'
import Dashboard from './Faculty/Dashboard'
import Resources from './Resources'
import SingleClassPage from './SingleClassPage'
import YourWork from './YourWork'
import Axios from 'axios'
import Interceptor from './../utils/interceptor'

message.config({
  top: 70,
  duration: 2,
  maxCount: 3,
});
library.add(fab, fas)



class App extends Component {


componentDidMount(){
  const token = localStorage.getItem('auth_token')
  if(token){
      let decode = jwtDecode(token)
     
      setAuthToken(token)
      store.dispatch({
          type: Types.SET_USER,
          payload: {
              user: decode
          }
      })
  }


const fac_token = localStorage.getItem('faculty_token')
if(fac_token){
  let decode = jwtDecode(fac_token)
     
  setAuthToken(fac_token)
  store.dispatch({
      type: Types.SET_FACULTY,
      payload: {
          faculty: decode
      }
  })
}

}




  render () {
    return (
      <BrowserRouter>
        <div >
          <Header/>
          {/* <SideBar/> */}
        <Switch>
          <Route exact  path="/" component={Landing}/>
          <Route exact  path="/classes"  component={Classes}/>
          <Route exact  path="/classes/:class" component={SingleClassPage} />

          <Route exact  path="/login"  component={Login}/>
          <Route exact  path="/register"  component={Register}/>
          <Route exact  path="/resources"  component={Resources}/>
          <Route exact  path="/workToDo" component={YourWork} />

          <Route exact  path="/faculty_login"  component={FacLogin}/>
          <Route exact  path="/faculty_register"  component={FacRegister}/>
          <Route exact  path="/faculty" component={Dashboard} />
        </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<Provider store ={store}><App /></Provider>, document.getElementById('app'))