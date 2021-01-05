import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppClient from '../../utils/AppClient';

import {
    Descriptions
} from 'antd';

export function ProfilePage() {

    const [loading, setLoading] = useState(false);
    const { userId } = useParams();
    const [User, setUser] = useState('');

    useEffect(() => {
        setLoading(true);
        const url = '/api/Admin/User/GetUserByName/' + userId;
        AppClient.get(url).then(res => {
            setUser(res.data);
            setLoading(false);
            console.log(res.data);
        }).catch(err => {
            setLoading(false);
        });
    }, []);

    const container =
        <Descriptions>
            <Descriptions.Item label='نام کاربری'>{ User.userName }</Descriptions.Item>
        </Descriptions>;
    return container;
}