import React from "react";
import MenuConfig from "../../config/"
import * as Icon from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { selectMenuList } from '../../store/reducers/tab'

const { Header, Sider, Content } = Layout;

// 动态获取icon, 转换成react组件
// const iconToElement = (name) => React.createElement(Icon[name]);

const iconToElement = (name) => { 
     return React.createElement(Icon[name])
};

// 处理菜单的数据
const items = MenuConfig.map((icon) => {
    // 没有子菜单
    const child = {
        key: icon.path,
        icon: iconToElement(icon.icon),
        label: icon.label
    }
    console.log(child.icon);
    // 有子菜单
    if (icon.children) {
        child.children = icon.children.map(item => {
            return {
                key: item.path,
                label: item.label
            }
        })
    }
    return child
})

const CommonAsider = ({ collapsed }) => {
    const navigate = useNavigate()
    const  dispatch = useDispatch()

    // 添加数据到store的方法
    const setTabList = (val) => {
        dispatch(selectMenuList(val))
    }

    //点击菜单
    const selectMenu = (e) => {
        console.log(e)
        let data
        MenuConfig.forEach( item => {
            //找到当前的数据
            if (item.path === e.keyPath[e.keyPath.length - 1]) {
                data = item
                // 如果是有二级菜单
                if (e.keyPath.length > 1) {
                    data = item.children.find(child => {
                        return child.path == e.key
                    })
                }

            }
        })
        setTabList({
            path: data.path,
            name: data.name,
            label: data.label
        })
        navigate(e.key)
    }

    return (
        <Sider trigger={null} collapsed={collapsed}>
            <h3 className="app-named"><font color="white">{collapsed ? '后台':'通用后台管理系统'}</font></h3>
            <div className="demo-logo-vertical" />
            <Menu
                theme="dark"
                mode="inline"
                items={items}
                defaultSelectedKeys={['1']}
                style={{
                    height: '100%',
                    
                }}
                onClick={selectMenu}
            />
        </Sider>
    )
}

export default CommonAsider