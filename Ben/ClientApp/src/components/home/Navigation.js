import React from 'react';
import {
    useHistory
} from 'react-router-dom';
import {
    Menu
} from 'antd';

import {
    LoginOutlined,
    UserAddOutlined
} from '@ant-design/icons';


const styles = {
    menu: {
        background: '#FFFFFF',
        fontFamily: 'iran',
        margin: '0px auto',
        width: '100%'
    },
    menuItem: {
        fontFamily: 'iran',
        fontSize: 14
    }
};


export function Navigation() {

    const history = useHistory();

    return (
        <Menu style={styles.menu} mode="horizontal" >
            <Menu.Item style={styles.menuItem}>
                <strong>رویداد پیشرفت</strong>
            </Menu.Item>
            <Menu.Item style={styles.menuItem}>صفحه اصلی</Menu.Item>
            <Menu.Item
                onClick={() => history.push('/login')}
                icon={<LoginOutlined />}
                style={{ float: 'left', fontFamily: 'iran', fontSize: 14 }}>ورود</Menu.Item>
            <Menu.Item
                 onClick={() => history.push('/register')}
                 icon={<UserAddOutlined/> } 
                 style={{ float: 'left', fontFamily: 'iran', fontSize: 14 }}>ثبت نام</Menu.Item>
        </Menu>    
        );
}