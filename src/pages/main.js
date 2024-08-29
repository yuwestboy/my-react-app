import React from "react";
import { Outlet } from "react-router-dom";
import { Layout, theme } from 'antd';
import CommonAsider from "../components/commonAsider";
import CommonHeader from "../components/commonHeader";
import CommonTag from "../components/commonTag";
import { useSelector } from 'react-redux'
import { RouterAuth } from "../router/routerAuth";

const { Content } = Layout;

const Main = () => {
    // const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    // 获取展开收起的状态
    const collapsed = useSelector(state => state.tab.isCollapsed)

    return (
        <RouterAuth>
            <Layout>
                <CommonAsider collapsed={collapsed} />
                <Layout>
                    <CommonHeader collapsed={collapsed} />
                    <CommonTag />
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </RouterAuth>

    );
}

export default Main