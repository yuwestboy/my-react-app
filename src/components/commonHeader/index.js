import React from "react";
import { Button, Layout, Avatar, Dropdown } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import './index.css'
import { useDispatch } from 'react-redux'
import { collapseMenu } from '../../store/reducers/tab'
import { useNavigate } from "react-router-dom";


const { Header } = Layout;

const CommonHeader = ({ collapsed }) => {
    // 创建dispatch
    const dispatch = useDispatch()
    // 点击展开收起按钮
    const setCollapsed = ()=> {
        console.log(collapsed)
        dispatch(collapseMenu())
    }
    const navigate = useNavigate()

    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" >
                    个人中心
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a onClick={() => logout()} target="_blank" rel="noopener noreferrer" >
                    退出
                </a>
            ),
        }
    ]
    
    //登出
    const logout = () => {
        //清除token
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <Header className="header-container">
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 32,
                    backgroundColor: "white"
                }}
                onClick={() => {setCollapsed()}}
            />
            <Dropdown menu={{ items }}>
                <Avatar size={36} src={<img src={require("../../assets/images/img1.PNG")} />} />
            </Dropdown>
        </Header>
    )
}

export default CommonHeader