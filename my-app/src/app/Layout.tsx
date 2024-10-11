

import { Layout } from 'antd'
import { Outlet } from 'react-router-dom';
const { Header, Footer, Content } = Layout;

export default function LayoutView() {

    return (
        <>
            <Layout className='flex w-full h-full flex-col overflow-hidden' >

                <Header className='bg-gray-300 flex'>Header</Header>
                <Content className='flex-col overflow-y-auto flex-1' >
                    <Outlet />

                </Content>

                <Footer className='flex' >Footersdasdad</Footer>

            </Layout>

        </>
    )
}