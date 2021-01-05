import React, { useState } from 'react';
import {
    Layout,
    Button,
    PageHeader
} from 'antd';
import { CategoryList } from './CategoryList';
import { CategoryAdd  } from './CategoryAdd';
import { CategoryEdit } from './CategoryEdit';


import {
    PlusOutlined
} from '@ant-design/icons';

export function Category() {

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
            <CategoryAdd visible={openAddModal} onClose={() => onCloseAddModal()} />
        : null;

    const editModalElement = openEditModal === true ?
        <CategoryEdit category={ selectedItem } visible={ openEditModal } onClose={() => onCloseEditModal()} />
        : null;

    const container =
        <Layout>
            <PageHeader title='دسته بندی' extra={[<Button type='default' onClick={() => onOpenAddModal()} icon={<PlusOutlined/> }>دسته جدید</Button>]} />
            <CategoryList
                setSelectedItem={ e => setSelectedItem(e) }
                openDeleteModal={() => onOpenDeleteModal() }
                openEditModal={() => onOpenEditModal()} />
            {addModalElement}
            {editModalElement}
        </Layout>;
    return container;
}
