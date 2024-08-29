import React from "react";
import { Form, Input, Button, message } from 'antd'
import './login.css'
import { getMenu } from '../../api'
import { useNavigate, Navigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    //在登录状态下需要跳转到home页面
    if (localStorage.getItem('token')) {
        console.log('跳转到home页面')
        return <Navigate to='/home' replace />
    }
    const handleSubmit = (val) => {
        if (!val.password || !val.username) {
            return message.open({
                type: 'warning',
                content: '请输入用户名和密码',
            });
        }
        getMenu(val).then(({ data }) => {
            console.log(data, 'data')
            localStorage.setItem('token', data.data.token)
            navigate('/home')
        })
    }
    return (
        <Form
            className="login-container"
            onFinish={handleSubmit}
        >
            <div className="login-title">系统登录</div>
            <Form.Item
                label="账号"
                name="username"
            >
                <Input placeholder="请输入账号" />
            </Form.Item>
            <Form.Item
                label="密码"
                name="password"
            >
                <Input.Password placeholder="请输入账号" />
            </Form.Item>
            <Form.Item className="login-button">
                <Button type="primary" htmlType="submit">登录</Button>
            </Form.Item>
        </Form>
    )
}

export default Login