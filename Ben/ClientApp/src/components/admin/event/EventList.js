import React, { useEffect, useState } from 'react';
import {
    Button,
    Table,
    Spin,
    Empty,
    PageHeader,
    Space
} from 'antd';


import {
    useHistory
} from 'react-router-dom';

import { MessageService } from '../../services/message.service';
import AppClient from '../../utils/AppClient';
import { EventService } from '../../services/event.service';

import {
    DeleteOutlined,
    EditOutlined
} from '@ant-design/icons';

const {
    Column
} = Table;

export function EventList() {

    const [Loading, SetLoading] = useState(false);

    const eventService = new EventService();
    const messageService = new MessageService();

    const list = eventService.getList();
    const history = useHistory();

    useEffect(() => {
        SetLoading(true);
        const url = '/api/Admin/Event/GetAll';
        AppClient.get(url).then(res => {
            res.data.forEach(element => {
                eventService.delete(element);
                eventService.add(element);
            });
            SetLoading(false);
        }).catch(err => {
            SetLoading(false);
        });
    }, []);


    const listDiv = list.length > 0 ?
        <Table dataSource={ list }>
            <Column title='#' key='#' render={(element, text, index) => {
                return <span>{index + 1}</span>;
            }} />
            <Column title='عنوان رویداد' dataIndex='name' key='name' />
            <Column title='توضیحات' dataIndex='description' key='description' />
            <Column title='بیشتر' key='action' render={element => {

                const container =
                    <Space size='small'>
                        <Button type='link'
                                icon={<EditOutlined />}
                                onClick={() => history.push('/admin/event/edit/' + element.id)}></Button>
                        <Button type='link'
                                icon={<DeleteOutlined />}
                            danger
                            onClick={() => history.push('/admin/event/delete/' + element.id)}></Button>
                    </Space>;
                return container;
            }} />
        </Table>
        : <Empty />;

    const loadingDiv = Loading === true ? <Spin/> : listDiv;

    const container =
        <>
            <PageHeader title='رویداد ها' extra={[<Button onClick={ () => history.push('/admin/event/add') }>رویداد جدید</Button>]} />
            {loadingDiv}
        </>;
    return container;
}