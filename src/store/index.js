import { configureStore } from '@reduxjs/toolkit'
import TabReducer from './reducers/tab'
import tab from './reducers/tab'

export default configureStore({
    reducer: {
        tab: TabReducer
    }
})