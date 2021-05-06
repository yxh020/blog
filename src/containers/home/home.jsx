import React, { Component } from 'react'

//import './css/home.less'
import Header from '../header/header'
import Content from '../content/content'
import { connect } from 'react-redux'
import {createDeleteUserInfoAction} from '../../redux/actions/login'
//import Tab from '../tab/tab'

@connect(
    state =>({user:state.userInfo}),
    {
        DeleteUserInfo:createDeleteUserInfoAction
    }
)
class Home extends Component {
    

    render() {
        return (
            <div className="home">
                <Header/>
                <Content/>
                {/* <Tab/> */}
            </div>
            
        )
    }
}

export default Home