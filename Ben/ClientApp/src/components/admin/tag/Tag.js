import React, { useState } from 'react';
import {
    Layout,
    Button,
    PageHeader
} from 'antd';
import { TagList } from './TagList';
import { TagAdd  } from './TagAdd';
import { TagEdit } from './TagEdit';


import {
    PlusOutlined
} from '@ant-design/icons';

export function Tag() {

    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');

    const onOpenAddModal = () => {
        setOpenAddModal(true);
    }
    const onCloseAddModal = () => {
        setOpenAddModal(false);
    }

    const onOpenEditModal = () => {
        setOpenEditModal(true);
    }

    const onCloseEditModal = () => {
        setOpenEditModal(false);
    }


    const onOpenDeleteModal = () => {
        setOpenDeleteModal(true);
    }

    const onCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    }

    const addModalElement = openAddModal === true ?
            <TagAdd visible={openAddModal} onClose={() => onCloseAddModal()} />
        : null;

    const editModalElement = openEditModal === true ?
        <TagEdit category={ selectedItem } visible={ openEditModal } onClose={() => onCloseEditModal()} />
        : null;

    const container =
        <Layout>
            <PageHeader title='برچسب ها' extra={[<Button type='default' onClick={() => onOpenAddModal()} icon={<PlusOutlined/> }>برچسب جدید</Button>]} />
            <TagList
                setSelectedItem={ e => setSelectedItem(e) }
                openDeleteModal={() => onOpenDeleteModal() }
                openEditModal={() => onOpenEditModal()} />
            {addModalElement}
            {editModalElement}
        </Layout>;
    return container;
}
