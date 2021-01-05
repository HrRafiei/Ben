import React, { useState } from 'react';
import validator from 'validator';
import {
    Form,
    Input,
    Button,
    message
} from 'antd';
import { MessageService } from '../../services/message.service';
import AppClient from '../../utils/AppClient';

export function ChangePassword() {

    const [loading, setLoading] = useState(false);
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [OldPassword, setOldPassword] = useState('');
    const [Errors, setErrors] = useState([]);

    const messageService = new MessageService();


    const onValidation = callback => {
        let isValidForm = true;
        let errors = {};

        if (validator.isEmpty(Password)) {
            isValidForm = false;
            errors['password_required'] = <span className='text-danger'>پسورد باید وارد شود.</span>;
        }

        if (validator.isEmpty(ConfirmPassword)) {
            isValidForm = false;
            errors['confirmPassword_required'] = <span className='text-danger'>تکرار پسورد باید وارد شود.</span>;
        }

        if (Password !== ConfirmPassword) {
            isValidForm = false;
            errors['compare'] = <span className='text-danger'>پسورد و تکرارش باید یکسان باشند.</span>;
        }

        if (validator.isEmpty(OldPassword)) {
            isValidForm = false;
            errors['oldPassword_required'] = <span className='text-danger'>پسورد قبلی باید وارد شود.</span>;
        }

        setErrors(errors);
        callback(isValidForm);
       
    }


    const onSubmit = () => {
        onValidation(isValid => {

            console.log(OldPassword, Password, ConfirmPassword);

            if (isValid) {
                setLoading(true);
                const url = '/api/Guest/ChangePassword';
                const formData = new FormData();
                formData.append('OldPassword', OldPassword);
                formData.append('Password', Password);
                formData.append('ConfirmPassword', ConfirmPassword);


                AppClient.post(url, formData).then(res => {
                    messageService.success();
                    setLoading(false);
                    setOldPassword('');
                    setPassword('');
                    setConfirmPassword('');
                }).catch(err => {
                    messageService.error();
                    setLoading(false);
                });

            } else {
                messageService.checkInput();
            }
        });
    }

    return (
        <Form wrapperCol={{ span: 14 }} labelCol={{ span: 4 }}>
            <Form.Item label='پسورد قبلی'>
                <Input.Password
                    id='OldPassword'
                    name='OldPassword'
                    value={OldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                />
                {Errors['oldPassword_required']}
            </Form.Item>
            <Form.Item label='پسورد جدید' >
                <Input.Password
                    id='Password'
                    name='Password'
                    value={Password}
                    onChange={e => setPassword(e.target.value)} />
                {Errors['password_required']}
            </Form.Item>
            <Form.Item label='تکرار پسورد'>
                <Input.Password
                    id='ConfirmPassword'
                    name='ConfirmPassword'
                    value={ConfirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)} />
                {Errors['confirmPassword_required']}
                {Errors['compare']}
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4 }}>
                <Button type='primary' loading={loading} onClick={ () => onSubmit() } > تغییر پسورد</Button>
            </Form.Item>
        </Form>);
}