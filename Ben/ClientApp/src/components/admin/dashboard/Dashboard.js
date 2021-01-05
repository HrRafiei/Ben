import React, { useEffect, useState } from 'react';
import {
    Card,
    Button,
    Col,
    Row,
    Layout
} from 'antd';
import AppClient from '../../utils/AppClient';


const styles = {
    wrapper: {
        padding: 5
    }
};

export function Dashboard() {

    const [count, setCount] = useState('');

    useEffect(() => {
        const url = '/api/Admin/Dashboard/GetStatistics';
        AppClient.get(url).then(res => {
            setCount(res.data);
        });
    }, []);

    const container =
        <Layout style={ styles.wrapper }>
            <Row>
                <Col span={6}>
                    <Card title='ایده ها'>
                        {count.ideas}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title='رویداد ها'>
                        {count.events}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title='کاربران'>
                        {count.users}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title='برچسب ها'>
                        {count.tags}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title='دسته بندی ها'>
                        {count.categories}
                    </Card>
                </Col>
            </Row>
        </Layout>;
    return container;
}