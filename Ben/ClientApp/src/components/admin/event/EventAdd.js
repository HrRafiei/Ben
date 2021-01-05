import React, { useState } from 'react';
import validator from 'validator';
import { useHistory } from 'react-router-dom';

import {
    Input,
    Button,
    Form,
    PageHeader,
    message
} from 'antd';
import { MessageService } from '../../services/message.service';
import { EventService } from '../../services/event.service';
import AppClient from '../../utils/AppClient';


const {
    TextArea
} = Input;

export function EventAdd() {

    const messageService = new MessageService();
    const eventService = new EventService();

    const [Loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [Errors, setErrors] = useState([]);
    const history = useHistory();

    const onValidation = callback => {
        let isValidForm = true;
        let errors = {};

        if (validator.isEmpty(name)) {
            isValidForm = false;
            errors['name_required'] = 'عنوان رویداد باید مشخص شود.';
        }

        setErrors(errors);
        callback(isValidForm);
    };


    const onSubmit = () => {
        onValidation(isValid => {
            if (isValid) {
                setLoading(true);
                const url = '/api/Admin/Event/Create';
                const formData = new FormData();
                formData.append('Name', name);
                formData.append('Description', description);
                AppClient.post(url, formData).then(res => {
                    eventService.add(res.data);
                    messageService.success();
                    history.push('/admin/event');
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
        <>
            <PageHeader title='رویداد جدید' extra={[<Button onClick={ () => history.push('/admin/event') }>رویداد ها</Button>]}/>
            <Form wrapperCol={{ span: 14 }} labelCol={{ span: 4 }}>
                <Form.Item label='عنوان رویداد' required>
                    <Input id='name' name='name' value={name} onChange={e => setName(e.target.value)} />
                    <span style={styles.textDanger}>{Errors['name_required']}</span>
                </Form.Item>
                <Form.Item label='توضیحات'>
                    <TextArea id='description' name='description' value={description} onChange={e => setDescription(e.target.value)}></TextArea>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4 }}>
                    <Button loading={Loading} onClick={ () => onSubmit() } type='primary'>ذخیره</Button>
                </Form.Item>
            </Form>
        </>;
    return container;
}


const styles = {
    textDanger: { color: 'red' }
};