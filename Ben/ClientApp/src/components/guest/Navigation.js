import React, { useState, useEffect } from 'react';
import {
    Menu,
    Modal
} from 'antd';
import { useHistory } from 'react-router-dom';
import AppClient from '../utils/AppClient';

const menuItemStyle = {
    fontFamily: 'iran',
    fontSize: 14
};

const floatLeft = {
    float: 'left',
}

export function Navigation() {
    const history = useHistory();

    const [user, setUser] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const url = '/api/Guest/GetCurrentUser';
        AppClient.get(url).then(res => {
            setUser(res.data);
        });
    }, []);


    const [loading, setLoading] = useState(false);
    const removeAccount = () => {
        setLoading(true);
        const url = '/api/Account/Logout';
        AppClient.get(url).then(res => {
            localStorage.removeItem('token');
            history.push('/');
            setLoading(false);
        }).catch(err => {
            setLoading(false);
        });
    }


    const OpenCloseModal = () => {
        setShowModal(true);
    }


    return (
        <span>

            <Modal visible={showModal}
                title='خروج'
                okText='خروج'
                cancelText='انصراف'
                confirmLoading={loading}
                onOk={() => removeAccount()}
                onCancel={() => setShowModal(false)}>
                <p>
                    آیا می خواهید از سامانه خارج شوید؟
                </p>
            </Modal>

            <Menu mode='horizontal'>
                <Menu.Item>
                    <span>بانام کاربری</span>
                    <strong> {user.userName} </strong>
                    <span>وارد شده اید.</span>
                </Menu.Item>
                <Menu.Item style={menuItemStyle}
                    onClick={() => history.push('/guest/addIdea')}>ایده جدید</Menu.Item>
                <Menu.Item style={menuItemStyle}
                    onClick={() => history.push('/guest/idea')}>ایده ها</Menu.Item>
                <Menu.Item style={menuItemStyle}
                    onClick={() => history.push('/guest/judje')}>داوری</Menu.Item>

                <Menu.Item style={{ ...menuItemStyle, ...floatLeft }} onClick={() => OpenCloseModal()}>خروج</Menu.Item>
                <Menu.Item style={{ ...menuItemStyle, ...floatLeft }} onClick={ () => history.push('/guest/profile') }>پروفایل کاربری</Menu.Item>
            </Menu>
        </span>
    )
}