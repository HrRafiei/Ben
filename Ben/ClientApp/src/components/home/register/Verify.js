import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    PageHeader,
    Layout,
    message
} from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import AppClient from '../../utils/AppClient';
import { MessageService } from '../../services/message.service';

export function Verify() {
    const history = useHistory();
    const { phoneNumber } = useParams();
    const [UserName, SetUserName] = useState(phoneNumber);
    const [Code, SetCode] = useState('');
    const [Loading, SetLoading] = useState(false);
    const messageService = new MessageService();

    const onSubmit = () => {
        SetLoading(true);
        const url = '/api/Account/VerifyAccount';
        const formData = new FormData();
        formData.append('UserName', UserName);
        formData.append('Code', Code);
        AppClient.post(url,formData)
            .then(res => {
                history.push('/register/success');
                SetLoading(false);
            })
            .catch(err => {
                SetLoading(false);
                messageService.error();
            });
    }

    return(
        <Layout>
             <PageHeader title='تایید حساب کاربری' 
                        onBack={() => history.push('/register')}
                        subTitle='کد تایید پیامک شده را وارد کنید.'/>
            <Form wrapperCol={{span: 16}} labelCol={{span: 4, offset: 2}}>
                <Form.Item label='کد تایید'>
                    <Input id='Code' name='Code' value={Code} onChange={e => SetCode(e.target.value)} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 6 }}>
                    <Button type='primary' onClick={ () => onSubmit() } loading={Loading}>تایید و ادامه</Button>
                </Form.Item>
            </Form>
        </Layout>
    );
}