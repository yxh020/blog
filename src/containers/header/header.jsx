import React, { Component} from 'react'
import {Link} from 'react-router-dom'
import {EditFilled} from '@ant-design/icons'
import {Button,Modal} from 'antd'
import { connect } from 'react-redux'
import {createDeleteUserInfoAction} from '../../redux/actions/login'

import './header.less'

@connect(
    state=>({user:state.userInfo}),
    {
        DeleteUserInfo:createDeleteUserInfoAction
    }
)
class Header extends Component {
    state={
        show:true,
        visible: false
    }

    //判断是否登录
    componentDidMount(){
        //console.log(this.props.user)
        //{username: "11", id: "606825d602e2c918e49ef9ce"}
        const {id} = this.props.user
        if(id){
            this.setState({show:false})
        }
        
    }
    
    showModal = () => {
        this.setState({
            visible:true
        });
      };
    
    handleOk = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
      //此处执行退出登录
      this.props.DeleteUserInfo()
      this.setState({show:true})
    };
    
    handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
    
    render() {
        const {show} = this.state
        
        return (
            <header className="header">
                
                    <Link
                    to='/home'><p className='header_p'>首页</p></Link>
                    {show?<div className='lar'>
                        <Link to="/login">
                            <button className="login">登录</button>
                        </Link>
                        <Link to='/register'>
                            <button className="register">注册</button>
                        </Link>
                        
                    </div>:<div className="user_div">
                        <p className="user_div_p">欢迎您 ,
                        <Link to='/personal'>
                        <Button  className="user_div_btn" type="link">{this.props.user.username}</Button>
                        </Link>
                        <Button onClick={this.showModal} className="user_div_btn" type="link">退出登录</Button>
                        <Link to='/writing'>
                        <button className='write'>
                        <EditFilled />写文章
                        </button>
                        </Link>
                        </p>
                        <Modal
                            title="提示"
                            //zIndex={0}
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            cancelText='取消'
                            okText='确定'
                        >    
                            <p>确定退出登录吗？</p>
                        </Modal>
                        
                    </div>  

                    }
                
                
            </header>
        )
    }
}
export default Header