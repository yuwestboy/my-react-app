import { createBrowserRouter, Navigate } from "react-router-dom"
import Main from "../pages/main"
import Home from "../pages/home/index"
import Mall from "../pages/mall/index"
import User from "../pages/user/index"
import PageOne from "../pages/other/pageOne"
import PageTwo from "../pages/other/pageTwo"
import Login from "../pages/login/login"


const routes = [
    {
        path: '/',
        Component: Main,
        children:[
            // 重定向
            {
                path: '/',
                element: <Navigate to="home" replace />
            },
            {
                path: 'home',
                Component: Home
            },
            {
                path: 'mall',
                Component: Mall
            },
            {
                path: 'user',
                Component: User
            },
            {
                path: 'other',
                children:[
                    {
                        path: 'pageOne',
                        Component: PageOne
                    },
                    {
                        path: 'pageTwo',
                        Component: PageTwo
                    },
                ]
            }
        ]
    },
    {
        path: '/login',
        Component: Login,
    }
]

export default createBrowserRouter(routes)