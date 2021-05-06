import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {reqRegister} from '../../api'
import { Form, Input, Button,message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';


export default class Register extends Component {
    
    render() {
        const onFinish = async(values) => {
            //console.log('收集的输入内容是: ', values);
            //此处发送注册请求
            const {username,password} = values
            let result = await reqRegister(username,password)
            //console.log('----',result)
            if(result!==undefined){
                const {status,msg,data} = result
                console.log(data);
                if(status === 0){
                //注册成功,跳转到登录
                message.success('注册成功',1)
                setTimeout(() => {
                    this.props.history.replace('/login')
                }, 500);
                
            }else message.warning(msg,1)
            }else{
                message.warning('与服务器断开连接，请检查网络是否畅通',1) 
            }
        }
    
        return (
            <div className="loginDiv">
                <h1>用户注册</h1>
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
                        }
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
                            message: '密码不应含空格'
                        },
                        {
                            pattern:/^[^\u4e00-\u9fa5]{0,}$/ ,
                            message: '密码不应含中文'
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
                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        rules={[
                        {
                            required: true,
                            message: '请输入密码!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error('两次输入的密码必须一致!'));
                            },
                          }),
                        ]}
                    >
                        <Input
                        size="large"
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="确认密码"
                        />
                        
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        注册
                        </Button>
                    </Form.Item>
                </Form>
                <Link to='/home'><span>去首页</span></Link>  
                <Link to='/login'><span className="goregister">去登录</span></Link>     
                
        </div>
        )
        
    }
}

