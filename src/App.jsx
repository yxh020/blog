import React, { Component } from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import Login from './containers/login/login'
import Home from './containers/home/home'
import Register from './containers/register/register'
import Detail from './containers/detail/detail'
import Writing from './containers/writing/writing'
import Personal from './containers/personal/personal'




export default class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/home' component={Home}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/detail' component={Detail}/>
                    <Route path='/writing' component={Writing}/>
                    <Route path='/personal' component={Personal}/>
                    <Redirect to='/home'></Redirect>
                </Switch>
            </div>
        )
    }
}
