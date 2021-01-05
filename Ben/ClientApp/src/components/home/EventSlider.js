import React, { useEffect, useState } from 'react';

import {
    Row,
    Card,
    Col,
    Divider,
    Spin,
    Space,
    Layout,
    Image
} from 'antd';
import AppClient from '../utils/AppClient';




const ItemStyle = {
    name: {
        fontFamily: 'zar',
        minHeight: '250px'
    },
    description: {
        textAlign: 'justify',
        textJustify: 'kashida',
        overflow: 'hidden',
        fontFamily: 'iran'
    }
};

function EventItem({ event }) {
    const container =
        <Card title={event.name} hoverable style={ItemStyle.name}>
            <p style={ItemStyle.description}>{event.description.substr(0, 200)}</p>
        </Card>;
    return container;
}



const sliderStyle = {
    width: '100%',
    heigth: '200px'
};


export function EventSlider() {

    const [Loading, SetLoading] = useState(false);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        SetLoading(true);
        const url = '/api/Home/GetEvents';
        AppClient.get(url).then(res => {
            setEvents(res.data);
            SetLoading(false);
        }).catch(err => {
            SetLoading(false);
        });
    }, []);


    const listDiv = events.length > 0 ?
        events.map((item, key) =>

            <Col span={8} style={{ padding: 5 }}>
                    <EventItem key={key} event={item} />
            </Col>
               
        ) : null;


    const loadingDiv = Loading === true ? <Spin /> : listDiv;

    const container =
        <Layout style={{ background: 'transparent', padding: 0 }}>
            <Divider orientation="right">رویداد ها</Divider>
            <Row>
                {loadingDiv}
            </Row>
        </Layout>;
        
    return container;
}