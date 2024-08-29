import React from 'react'
import { Tag, Space } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { closeTab, setCurrentMenu } from '../../store/reducers/tab'
import './commonTag.css'

const CommonTag = () => {
    const tabList = useSelector(state => state.tab.tabList)
    const currentMenu = useSelector(state => state.tab.currentMenu)
    const dispatch = useDispatch()
    const action = useLocation()
    const navigate = useNavigate()
    const handleClose = (tag, index) => {
        let length = tabList.length - 1
        dispatch(closeTab(tag))
        //关闭的不是当前的tags
        if (tag.path !== action.pathname) {
            return
        } 
        //关闭的是当前的tag
        if (index === length) {
            //设置当前数据
            const curData = tabList[index -1]
            dispatch(setCurrentMenu(curData))
            navigate(curData.path)
        } else {
            //如果tag至少存在一个数据的话，则选中后一个tag
            if ( tabList.length > 1 ) {
                // 跳转到下一个tag
                const nextData = tabList[index + 1]
                dispatch(setCurrentMenu(nextData))
                navigate(nextData.path)
            }
        }
    }
    //点击tag
    const handleChange = (tag) => {
        dispatch(setCurrentMenu(tag))
        navigate(tag.path)
    }
    // tag显示的逻辑
    const setTag = ( flag, item, index ) => {
        return (
            flag ?
            <Tag color='#55acee' closeIcon onClose={() => handleClose(item, index)} key={item.name}>{ item.label }</Tag> 
            :
            <Tag onClick={() => handleChange(item)} key={item.name}>{ item.label }</Tag>
        )
    }
    return (
        <Space className='common-tag' size={[0, 8]} wrap>
            {
                currentMenu.name && tabList.map((item, index) => (setTag(item.path === currentMenu.path, item, index)))
            }
        </Space>
    )
}

export default CommonTag