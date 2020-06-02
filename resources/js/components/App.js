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

import jwtDecode from 'jwt-decode'
import * as Types from './../actions/types'
import Landing from './Landing'
import {message} from 'antd'
import Resources from './Resources'
import People from './People'
import SingleClassPage from './SingleClassPage'
import YourWork from './YourWork'
import Axios from 'axios'
import Interceptor from './../utils/interceptor'
import SinglePostPage from './SinglePostPage'

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
          <Route exact  path ="/classes/:class/post/:post" component={SinglePostPage} />
          <Route exact  path="/login"  component={Login}/>
          <Route exact  path="/register"  component={Register}/>
          <Route exact  path="/classes/:class/resources"  component={Resources}/>
          <Route exact  path="/classes/:class/workToDo" component={YourWork} />
          <Route exact path="/classes/:class/people" component={People} />

        </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<Provider store ={store}><App /></Provider>, document.getElementById('app'))