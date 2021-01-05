import React from 'react';
import {
    Layout,
    Col,
    Row,
    Menu,
    Dropdown
} from 'antd';
import {
    BlockOutlined,
    TagsOutlined,
    BulbOutlined,
    UserOutlined,
    DashboardOutlined,
    CalendarOutlined
} from '@ant-design/icons';

import { Route, useHistory } from 'react-router-dom';
import { Category } from './category/Category';
import { Dashboard } from './dashboard/Dashboard';
import { Tag } from './tag/Tag';
import { Idea } from './idea/Idea';
import { User } from './user/User';
import { Event } from './event/Event';

const {
    Header
} = Layout;


function AdminHeader() {

    const menu = (
        <Menu>
            <Menu.Item key="1" icon={<UserOutlined />}>
                1st menu item
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
                2nd menu item
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
                3rd menu item
            </Menu.Item>
        </Menu>
    );

    const container =
        <Header style={headerStyle.header}>
            <p style={headerStyle.brand}>رویداد پیشرفت</p>
        </Header>;
    return container;
}

function Sidebar() {
    const history = useHistory();
    const container =
        <Menu mode='vertical-right' style={{height: '100%'}}>

            <Menu.Item
                key='5'
                icon={<DashboardOutlined />}
                onClick={() => history.push('/admin')}>
                <span style={ styles.menuItem }> داشبورد</span>
             </Menu.Item>

            <Menu.Item
                key='6'
                icon={<CalendarOutlined />}
                onClick={() => history.push('/admin/event')}>
                <span style={styles.menuItem}>رویداد ها</span>
             </Menu.Item>

            <Menu.Item
                key='3'
                icon={<BulbOutlined />}
                onClick={() => history.push('/admin/idea')}>
                <span style={styles.menuItem}> ایده ها</span>
             </Menu.Item>


            <Menu.Item
                key='4'
                icon={<UserOutlined />}
                onClick={() => history.push('/admin/user')}>
                <span style={styles.menuItem}> کاریران</span>
             </Menu.Item>

            <Menu.Item
                key='1'
                icon={<BlockOutlined />}
                onClick={() => history.push('/admin/category')}>
               
                <span style={styles.menuItem}>  دسته بندی</span>
             </Menu.Item>

            <Menu.Item
                key='2'
                icon={<TagsOutlined />}
                onClick={() => history.push('/admin/tag')}>
                <span style={styles.menuItem}> برچسب ها</span>
            </Menu.Item>

        </Menu>;

    return container;
}


export function Admin() {

    const container =
        <Layout style={styles.container}>
            <AdminHeader />
            <Row>
                <Col span={4}>
                    <Sidebar />
                </Col>

                <Col span={20}>
                    <Route exact={true} path='/admin' component={Dashboard} />
                    <Route path='/admin/idea' component={Idea} />
                    <Route path='/admin/user' component={User} />
                    <Route path='/admin/category' component={Category} />
                    <Route path='/admin/tag' component={Tag} />
                    <Route path='/admin/event' component={Event} />
                </Col>

            </Row>
        </Layout>;

    return (container);
}


const styles = {
    container: {
        margin: '0px auto',
        width: 960,
        minHeight: 720,
    },
    menuItem: {
        fontFamily: 'iran',
        fontSize: 14
    }
}

const headerStyle = {
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    brand: {
        color: 'white',
        fontFamily: 'iran'
    }
};