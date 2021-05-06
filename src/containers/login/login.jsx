import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {reqLogin} from '../../api'
import {createSaveUserInfoAction} from '../../redux/actions/login'
import {Form, Input, Button,message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import './login.less'


@connect(
    state =>({user:state.userInfo}),
    {
        saveUserInfo:createSaveUserInfoAction
    }
)
class Login extends Component {
    
    render() {
        const onFinish = async(values) => {
            //console.log('收集的输入内容是: ', values);
            const {username,password} = values
            //此处发送登录请求 
            let result = await reqLogin(username,password)
            //console.log(result);
            if(result!==undefined){
                const {msg,status,data} = result
            //console.log(data);
            if(status===0){
               //登录成功，把username存到redux中
               this.props.saveUserInfo(data)
               //跳首页
               this.props.history.replace('/home')
            }else{
                message.warning(msg,1) 
            }
            }else{
                message.warning('与服务器断开连接，请检查网络是否畅通',1)
            }
            
        }
    
        return (
            <div className="loginDiv">
                <h1>用户登录</h1>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    >
                    <Form.Item
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: '请输入用户名!',
                        },
                        {
                            min:2,
                            message: '用户名应为2-8位!',
                        },
                        {
                            max:12,
                            message: '用户名应为2-8位!',
                        },
                        {
                            pattern:/^[^\s]*$/,
                            message: '用户名不能包含空格'
                        },
                        ]}
                    >
                        <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: '请输入密码!',
                        },
                        {
                            min:4,
                            message: '密码应为4-12位!',
                        },
                        {
                            max:12,
                            message: '密码应为4-12位!',
                        },
                        {
                            pattern:/^[^\s]*$/,
                            message: '密码不能含空格'
                        },
                        {
                            pattern:/^[^\u4e00-\u9fa5]{0,}$/ ,
                            message: '密码不能含中文'
                            
                        }
                        ]}
                    >
                        <Input
                        size="large"
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="密码"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                        </Button>
                        
                    </Form.Item>
                </Form>
                <Link to='/home'><span>去首页</span></Link>  
                <Link to='/register'><span className="goregister">去注册</span></Link> 
        </div>
        )
        
    }
}
export default Login