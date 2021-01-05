import React, {useState, useEffect} from 'react';
import { IdeaItem } from './IdeaItem';
import AppClient from '../../utils/AppClient';

import {
    PageHeader,
    Timeline
} from 'antd';









export function Ideas() {

    const [Loading, setLoading] = useState(false);
    const [list, setList] = useState([]);


    useEffect(() => {
        setLoading(true);
        const url = '/api/Guest/GetEvents';
        AppClient.get(url).then(res => {
            setLoading(false);
            setList(res.data);
        }).catch(err => {
            setLoading(false);
        });
    }, []);


    return (
        <span>
            <PageHeader title='ایده های شما براساس رویداد ها' />
            <div style={{paddingRight: 20}}>
            <Timeline>
            {
                list.map((item, key) => <IdeaItem key={key} event={item}/>)
            }
            </Timeline>
            </div>
        </span>
        );
}