import React, { useState, useEffect } from 'react';
import {
    Empty,
    Layout,
    Table,
    Button,
    Space,
    Spin,
    Modal
} from 'antd';
import { TagService }  from '../../services/tag.service';
import AppClient from '../../utils/AppClient';

import {
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import { MessageService } from '../../services/message.service';

const {
    Column
} = Table;

const {
    confirm
} = Modal;

export function TagList({ setSelectedItem, openEditModal, openDeleteModal }) {

    const [loading, setLoading] = useState(false);
    const catService = new TagService();
    const list = catService.getList();
    const messageService = new MessageService();


    useEffect(() => {
        setLoading(true);
        const url = '/api/Admin/Tag/GetAll';
        AppClient.get(url).then(res => {
            res.data.forEach(item => {
                catService.delete(item);
                catService.add(item);
            });
            setLoading(false);
        }).catch(err => setLoading(false));
    }, []);


    const openEditModalPage = (element) => {
        openEditModal(element);
        setSelectedItem(element);
    }


    const [deleteLoading, setDeleteLoading] = useState(false);
    function DeleteCategory(category) {
        setDeleteLoading(true);
        const url = '/api/Admin/Tag/Delete/' + category.id;
        AppClient.delete(url).then(res => {
            messageService.success();
           catService.delete(category);
            setDeleteLoading(false);
        }).catch(err => {
            setDeleteLoading(false);
            messageService.error();
        });
    }


    const openDeleteConfirm = (category) => {
        const confirmContent =
            <div>
                <Space size='small' direction='horizontal'>
                    <span>آیا می خواهید برچسب </span>
                    <strong>{category.name}</strong>
                    <span>حذف شود؟</span>
                </Space>
            </div>;
        confirm({
            icon: <DeleteOutlined />,
            content: confirmContent,
            okText: 'حذف',
            cancelText: 'انصراف',
            okType: 'danger',
            onOk() {
                DeleteCategory(category);
            }
        });
    };


    const listElement = list.length > 0 ?
        <Table dataSource={list}>
            <Column title='#' key='#' render={(item, text, index) => {
                return <span className='index'>{index + 1}</span>;
            }} />
            <Column title='نام برچسب' dataIndex='name' key='name' />
            <Column title='گزینه ها' key='action' render={(element) => {
                const container =
                    <Space size='small'>
                        <Button
                            size='small'
                            type='default'
                            onClick={() => openEditModalPage(element)} icon={<EditOutlined/>}/>
                        <Button
                            size='small'
                            type='default'
                            danger
                            onClick={ () => openDeleteConfirm(element) }
                            icon={<DeleteOutlined />} />
                    </Space>;
                return container;
            }} />
        </Table>
        : <Empty />;

    const loadingElement = loading === true ? <Spin /> : listElement;

    const container =
        <Layout>
            {loadingElement}
        </Layout>;
    return container;
}