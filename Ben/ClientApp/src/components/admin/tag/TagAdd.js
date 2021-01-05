import React, { useState } from 'react';
import validator from 'validator';
import {
    Form,
    Input,
    Button,
    Modal,
    Space,
    message
} from 'antd';
import { MessageService } from '../../services/message.service';
import AppClient from '../../utils/AppClient';
import { TagService } from '../../services/tag.service';

export function TagAdd({ visible, onClose }) {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(visible);
    const [errors, setErrors] = useState([]);
    const [Name, setName] = useState('');
    const messageService = new MessageService();
    const categoryService = new TagService();

    const onCloseModal = () => {
        setOpen(false);
        onClose();
    }

    const onValidation = callback => {
        let isValidForm = true;
        let errors = {};

        if (validator.isEmpty(Name)) {
            isValidForm = false;
            errors['name_required'] = "نام برچسب باید وارد شود.";
        }

        setErrors(errors);
        callback(isValidForm);
    };


    const onSubmit = () => {
        onValidation(isValid => {
            if (isValid) {
                setLoading(true);
                const url = '/api/Admin/Tag/Create';
                const formData = new FormData();
                formData.append('Name', Name);
                AppClient.post(url, formData).then(res => {
                    categoryService.add(res.data);
                    messageService.success();
                    setLoading(false);
                    onClose();
                }).catch(err => {
                    setLoading(false);
                    messageService.error();
                });
            } else {
                messageService.checkInput();
            }
        });
    };

    const container =
        <Modal
            title=' برچسب جدید'
            visible={open}
            onCancel={() => onCloseModal()}
            footer={null}
        >

                <Form wrapperCol={20} labelCol={ 4 }>
                    <Form.Item label='نام برچسب'>
                        <Input
                        id='Name'
                        name='Name'
                        value={Name}
                        onChange={e => setName(e.target.value) }
                    />
                    </Form.Item>
                <Form.Item wrapperCol={{offset: 3}}>
                    <Space size='small' direction='horizontal'>
                        <Button type='primary' loading={ loading } onClick={ () => onSubmit() }>ذخیره</Button>
                        <Button type='default' onClick={() => onCloseModal()}>انصراف</Button>
                    </Space>
                </Form.Item>
                </Form>
        </Modal>;
    return container;
}