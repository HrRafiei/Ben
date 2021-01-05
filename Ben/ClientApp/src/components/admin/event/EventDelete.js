import React, { useEffect, useState } from 'react';
import {
    Card,
    PageHeader,
    Button,
    message
} from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import AppClient from '../../utils/AppClient';
import { MessageService } from '../../services/message.service';
import { EventService } from '../../services/event.service';

import {
    DeleteOutlined
} from '@ant-design/icons';


export function EventDelete() {

    const history = useHistory();
    const { id } = useParams();

    const [Loading, SetLoading] = useState(false);
    const [Event, SetEvent] = useState('');

    const messageService = new MessageService();
    const eventService = new EventService();

    useEffect(() => {
        SetLoading(true);
        const url = '/api/Admin/Event/Get/' + id;
        AppClient.get(url).then(res => {
            SetEvent(res.data);
            SetLoading(false);
        }).catch(err => {
            SetLoading(false);
            messageService.error();
        });
    }, []);


    const [Deleting, SetDeleting] = useState(false);
    const OnDelete = () => {
        SetDeleting(true);
        const url = '/api/Admin/Event/Delete/' + id;
        AppClient.delete(url).then(res => {
            eventService.delete(res.data);
            SetDeleting(false);
            history.push('/admin/event');
            messageService.success();
        }).catch(err => {
            SetDeleting(false);
            messageService.error();
        });
    }


    const container = 
        <>
            <PageHeader title='حذف رویداد' extra={[<Button type='default' onClick={ () => history.push('/admin/event') }>رویداد ها</Button>]} />
            <Card title={Event.name}>
                <p>{Event.description}</p>
                <Button type='primary' danger loading={Deleting} onClick={() => OnDelete()}>حذف رویداد</Button>
            </Card>
        </>;
    return container;
}


