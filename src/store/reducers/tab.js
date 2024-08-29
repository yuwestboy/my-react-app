import { createSlice, current } from '@reduxjs/toolkit'

const tabSlice = createSlice({
    name: 'tab',
    initialState: {
        isCollapsed: false,
        tabList: [
            {
                path: '/',
                name: 'home',
                label: '首页'
            }
        ],
        currentMenu: {}
    },
    reducers: {
        collapseMenu: state => {
            state.isCollapsed = !state.isCollapsed
        },
        selectMenuList: (state, { payload: val}) => {
            if (val.name !== 'home') {
                state.currentMenu = val
                //已经存在的tag就不需要添加
                const result = state.tabList.findIndex(item => item.name === val.name )
                if ( result === -1 ) {
                    state.tabList.push(val)
                }
            // } else if ( val.name === 'home' ) {
            //     console.log(state.tabList,'state.tabList')
            //     state.tabList = []
            //     state.currentMenu = {} //初始路由
            // }

            } else if (val.name === 'home' && state.tabList.length === 1) {
                state.currentMenu = {} //初始路由
            }
        },
        closeTab: (state, { payload: val}) => {
            let res = state.tabList.findIndex(item => item.name === val.name )
            state.tabList.splice(res, 1)
        },
        setCurrentMenu: (state, { payload: val }) => {
            if(val.name === 'home') {
                state.currentMenu = {}
            } else {
                state.currentMenu = val
            }
        }
    }
})

export const {collapseMenu, selectMenuList, closeTab, setCurrentMenu } = tabSlice.actions
export default tabSlice.reducer