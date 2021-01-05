import React, { useEffect, useState } from 'react';
import validator from 'validator';
import {
    Form,
    Input,
    Button,
    PageHeader,
    Spin
} from 'antd';
import { UserAvatar } from './UserAvatar';
import AppClient from '../../utils/AppClient';
import { MessageService } from '../../services/message.service';


const {
    TextArea
} = Input;

export function UserProfile() {

    const [userProfile, setUserProfile] = useState(undefined);
    const [loading, setLoading] = useState(false);

    //fields
    const [FirstName, SetFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [FatherName, setFatherName] = useState('');
    const [CodeMeli, SetCodeMeli] = useState('');
    const [Description, SetDescription] = useState('');

    const messageService = new MessageService();

    useEffect(() => {
        AppClient.get('/api/Guest/GetCurrentUserProfile').then(res => {
            setUserProfile(res.data);
            let user = res.data;
            SetFirstName(user.firstName);
            setLastName(user.lastName);
            setFatherName(user.fatherName);
            SetCodeMeli(user.codeMeli);
            SetDescription(user.description);
        });
    }, []);


    const onSubmit = () => {
        setLoading(true);
        const url = '/api/Guest/UpdateProfileInfo';
        const formData = new FormData();
        formData.append('FirstName', FirstName);
        formData.append('LastName', LastName);
        formData.append('FatherName', FatherName);
        formData.append('CodeMeli', CodeMeli);
        formData.append('Description', Description);

        AppClient.post(url, formData).then(res => {
            messageService.success();
            setLoading(false);
        }).catch(err => {
            messageService.error();
            setLoading(false);
        });
    }

    const profile = userProfile !== undefined ?
        (
            <Form wrapperCol={{ span: 14 }} labelCol={{span: 4}}>
                <Form.Item title='Avatar'>
                    <UserAvatar path={userProfile.avatar} />
                </Form.Item>

                <Form.Item label='نام'>
                    <Input id='FirstName' name='FirstName' value={FirstName} onChange={e => SetFirstName(e.target.value)} />
                </Form.Item>

                <Form.Item label='نام خانوادگی'>
                    <Input id='LastName' name='LastName' value={LastName} onChange={e => setLastName(e.target.value)} />
                </Form.Item>

                <Form.Item label='نام پدر'>
                    <Input id='FatherName' name='FatherName' value={FatherName} onChange={e => setFatherName(e.target.value)} />
                </Form.Item>

                <Form.Item label='کد ملی'>
                    <Input id='CodeMeli' name='CodeMeli' value={CodeMeli} onChange={ e => SetCodeMeli(e.target.value) }/>
                </Form.Item>

                <Form.Item label='توضیحات'>
                    <TextArea id='Description' name='Description' value={Description} onChange={ e => SetDescription(e.target.value) }></TextArea>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 4 }}>
                    <Button type='primary' loading={loading} onClick={ ()=> onSubmit() }>ذخیره</Button>
                </Form.Item>

            </Form>
        ) : <Spin />;

    return (
        <div>
            <PageHeader title='پروفایل کاربری' />
            {profile}
        </div>
        );
}