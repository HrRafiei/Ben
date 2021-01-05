import React, { useState } from 'react';
import validator from 'validator';
import jwt_decode from 'jwt-decode';

import {
    Layout,
    Input,
    Form,
    Button,
    PageHeader
} from 'antd';
import { MessageService } from '../services/message.service';
import AppClient from '../utils/AppClient';
import { useHistory } from 'react-router-dom';


const styles = {
    wrapper: {
        position: 'absolute',
        right: 0,
        left: 0,
        margin: '0px auto',
        width: '478px',
        top: 120,
        padding: 20
    }
};

export function Login() {

    const [UserName, SetUserName] = useState('');
    const [Password, SetPassword] = useState('');
    const [Loading, SetLoading] = useState(false);
    const [Errors, SetErrors] = useState([]);
    const messageService = new MessageService();
    const history = useHistory();

    const onValidation = callback => {
        let isValidForm = true;
        let errors = {};

        if (validator.isEmpty(UserName)) {
            isValidForm = false;
            errors['userName_required'] = "نام کاربری باید وارد شود.";
        }

        if (validator.isEmpty(Password)) {
            isValidForm = false;
            errors['password_requried'] = 'پسورد باید وارد شود.';
        }

        SetErrors(errors);
        callback(isValidForm);
    }


    const onSubmit = () => {
        onValidation(isValid => {
            if (isValid) {
                SetLoading(true);
                const url = '/api/Account/Login';
                const formData = new FormData();
                formData.append('UserName', UserName);
                formData.append('Password', Password);
                AppClient.post(url, formData).then(res => {
                    const token = res.data;
                    localStorage.setItem('token', token);
                    SetLoading(false);
                    messageService.success();
                    const role = jwt_decode(token).role;
                    history.push('/' + role);
                    SetLoading(false);
                }).catch(err => {
                    SetLoading(false);
                    messageService.error();
                });
            } else {
                messageService.checkInput();
                SetLoading(false);
            }
        });
    }

    return (
        <Layout style={styles.wrapper}>
            <PageHeader title='ورود به پخش کاربری'/>
            <Form wrapperCol={{ span: 18, offset: 1 }} labelCol={{span: 5}}>

                <Form.Item label='شماره موبایل'>
                    <Input
                        id='UserName'
                        name='UserName'
                        value={UserName}
                        onChange={e => SetUserName(e.target.value)}
                    />
                </Form.Item>

                <Form.Item label='پسورد'>
                    <Input.Password
                        id='Password'
                        name='Password'
                        value={Password}
                        onChange={e => SetPassword(e.target.value)}
                    />
                </Form.Item>

                <Form.Item wrapperCol={{offset: 6}}>
                    <Button
                        onClick={() => onSubmit()}
                        type='primary'
                        loading={Loading}>ورود</Button>
                    
                    <Button 
                        onClick={() => history.push('/register')}
                        type='link'
                        >
                            ایجاد حساب
                    </Button>
                </Form.Item>

            </Form>
        </Layout>
        )
}