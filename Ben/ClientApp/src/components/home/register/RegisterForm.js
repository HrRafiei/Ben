import React, { useState } from 'react';
import {
    Layout,
    Form,
    Input,
    Button,
    PageHeader,
    Switch,
    Tag,
    message,
    Space
} from 'antd';
import AppClient from '../../utils/AppClient';
import { MessageService } from '../../services/message.service';

import {
    useHistory
} from 'react-router-dom';


const styles = {
    container: {
        margin: '0px auto',
        width: '976px',
        marginTop: 120,
        position: 'absolute',
        right: 0,
        left: 0,
        boxShadow: '3px 2px 3px 1px #cccccc',
        borderRadius: 7,
        borderRadiusTopRigth: 0,
        borderRadiusTopLeft: 0,
        fontFamily: 'iran'
    },
    form: {

    },
    image: {
        width: '100%',
        height: '100%'
    }
};


export function RegisterForm() {

    const [Loading, SetLoading] = useState(false);
    const [UserName, SetUserName] = useState('');
    const [Password, SetPassword] = useState('');
    const [ConfirmPassword, SetConfirmPassword] = useState('');
    const [IsJudje, SetJudje] = useState(false);


    const history = useHistory();
    const messageService = new MessageService();


   

    const onSubmit = () => {
        SetLoading(true);
        const url = '/api/Account/Register';
        const formData = new FormData();
        formData.append('UserName', UserName);
        formData.append('Password', Password);
        formData.append('ConfirmPassword', ConfirmPassword);
       

        AppClient.post(url, formData)
            .then(res => {
                console.log(res.data);
                message.success('پیامک حاوی کد تایید ارسال شد.');
                SetLoading(false);
                history.push('/register/verify/' + UserName);
            })
            .catch(err => {
                console.log(err.message);
                SetLoading(false);
            });
    }

    return (<Layout>
        <PageHeader title='ایجاد حساب کاربری' />
        <Form style={styles.form} wrapperCol={{ span: 16 }} labelCol={{ span: 4, offset: 2 }}>
            <Form.Item label='شماره موبایل'>
                <Input id='UserName' name='UserName' value={UserName} onChange={e => SetUserName(e.target.value)} />
            </Form.Item>
            <Form.Item label='پسورد'>
                <Input.Password id='Password' name='Password' value={Password} onChange={ e => SetPassword(e.target.value) }/>
            </Form.Item>
            <Form.Item label='تکرار پسورد'>
                <Input.Password id='ConfirmPassword' name='ConfirmPassword' value={ConfirmPassword} onChange={ e => SetConfirmPassword(e.target.value) } />
            </Form.Item>
           
            <Form.Item wrapperCol={{ offset: 6 }}>
                <Space direction='horizontal' size='large' style={{width: '100%'}}>
                    <Button type='primary'
                            onClick={() => onSubmit()}
                            loading={Loading}>ایجاد حساب</Button>
                    <Button type='link' onClick={() => history.push('/login')}>ورود</Button>
                </Space>
            </Form.Item>
        </Form>
    </Layout>)
}