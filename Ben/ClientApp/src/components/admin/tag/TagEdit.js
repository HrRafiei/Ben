import React, { useState } from 'react';
import validator from 'validator';

import {
    Form,
    Input,
    Button,
    Modal,
    message,
    Space
} from 'antd';
import AppClient from '../../utils/AppClient';
import { MessageService } from '../../services/message.service';
import { TagService } from '../../services/tag.service';

export function TagEdit({ category, visible, onClose }) {
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(visible);
    const [name, setName] = useState(category.name);
    const [id, setId] = useState(category.id);
    const messageService = new MessageService();
    const categoryService = new TagService();


    const onCloseModalPage = () => {
        setIsOpen(false);
        onClose();
    }

    const OnValidation = callback => {
        let isValidForm = true;
        if (validator.isEmpty(name)) {
            isValidForm = false;
        }

        if (validator.isEmpty(id)) {
            isValidForm = false;
        }

        callback(isValidForm);
    }

    const onSubmit = () => {
        OnValidation(isValid => {
            if (isValid) {
                setLoading(true);
                const url = '/api/Admin/Tag/EditCategory/' + id;
                const formData = new FormData();
                formData.append('Id', id);
                formData.append('Name', name);
                AppClient.put(url, formData).then(res => {
                    categoryService.edit(res.data);
                    setLoading(false);
                    messageService.success();
                    onCloseModalPage();
                }).catch(err => {
                    setLoading(false);
                    messageService.error();
                });
            } else {
                messageService.checkInput();
            }
        });
    }

    const container =
        <Modal visible={isOpen} footer={ null } title='ویرایش'  onCancel={() => onCloseModalPage()}>
            <Form wrapperCol={{ span: 20 }} labelCol={{span: 4}}>
                <Form.Item label='نام برچسب'>
                    <Input id='Name' name='Name' value={name} onChange={ e => setName(e.target.value) }/>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4 }}>
                    <Space size='small' direction='horizontal'>
                        <Button type='primary' loading={loading} onClick={() => onSubmit()}>ذخیره</Button>
                        <Button type='default' onClick={() => onCloseModalPage()}>انصراف</Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>;
    return container;
}