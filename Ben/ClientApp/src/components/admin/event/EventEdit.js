import {
    Button,
    Form,
    Input,
    PageHeader
} from 'antd';
import React, { useEffect, useState } from 'react';
import validator from 'validator';
import {
    useHistory,
    useParams
} from 'react-router-dom';
import AppClient from '../../utils/AppClient';
import { MessageService } from '../../services/message.service';
import { EventService } from '../../services/event.service';


const {
    TextArea
} = Input;

export function EventEdit() {
    const { id } = useParams();
    const history = useHistory();
    const [Loading, setLoading] = useState(false);
    const [Errors, SetError] = useState([]);

    const messageService = new MessageService();
    const eventService = new EventService();

    useEffect(() => {
        setLoading(true);
        const url = '/api/Admin/Event/Get/' + id;
        AppClient.get(url).then(res => {
            let event = res.data;
            setId(event.id);
            setName(event.name);
            setDescription(event.description);
            setLoading(false);
        }).catch(err => {
            setLoading(false);
        });
    }, []);


    const [Id, setId] = useState(Event.id);
    const [Name, setName] = useState(Event.Name);
    const [Description, setDescription] = useState(Event.description);

    const onValidation = callback => {
        let isValidForm = true;
        let errors = {};

        if (validator.isEmpty(Name)) {
            isValidForm = false;
            errors['name_required'] = 'عنوان رویداد باید وارد شود.';
        }

        SetError(errors);
        callback(isValidForm);
    }

    const onSubmit = () => {
        onValidation(isValid => {
            if (isValid) {
                setLoading(true);
                const url = '/api/Admin/Event/Edit/' + Id;
                const formData = new FormData();
                formData.append('Id', Id);
                formData.append('Name', Name);
                formData.append('Description', Description);

                AppClient.put(url, formData).then(res => {
                    messageService.success();
                    eventService.add(res.data);
                    setLoading(false);
                    history.push('/admin/event');
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
        <>
            <PageHeader title='ویرایش رویداد' extra={[
                <Button
                    type='default'
                    onClick={ () => history.push('/admin/event')}>رویداد ها</Button>]} />


            <Form wrapperCol={{ span: 14 }} labelCol={{ span: 4 }}>

                <Form.Item label='عنوان رویداد'>
                    <Input id='Name' name='Name' value={Name} onChange={ e => setName(e.target.value) } />
                </Form.Item>


                <Form.Item label='توضیحات'>
                    <TextArea id='Description' name='Description' value={Description} onChange={e => setDescription(e.target.value)}></TextArea>
                </Form.Item>


                <Form.Item wrapperCol={{offset: 4}}>
                    <Button type='primary' loading={Loading} onClick={ () => onSubmit() }>ذخیره</Button>
                </Form.Item>
        </Form>
        </>
    return container;
}