import React, { useEffect, useState } from 'react';
import validator from 'validator';
import {
    useHistory
} from 'react-router-dom';

import {
    PageHeader,
    Button,
    Form,
    Input,
    message,
    Select
} from 'antd';

import {
    OrderedListOutlined,
    UserOutlined
} from '@ant-design/icons';
import AppClient from '../../utils/AppClient';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../services/message.service';
import { RolePersianName } from './RolePersianName';

const {
    Option
} = Select;

export function UserAdd() {

    let history = useHistory();
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loadingRoles, setLoadingRoles] = useState(false);
    const [Role, SetRole] = useState('');

    const userService = new UserService();
    const messageService = new MessageService();

    useEffect(() => {
        setLoadingRoles(true);
        const url = '/api/Admin/Role/GetAll';
        AppClient.get(url).then(res => {
            setLoadingRoles(false);
            setRoles(res.data);
        }).catch(err => {
            setLoadingRoles(false);
        });
    }, []);

    const onValidation = callback => {
        let isValidForm = true;
        const errors = {};

        if (validator.isEmpty(userName)) {
            isValidForm = false;
            errors['userName_required'] = "شماره موبایل را وارد کنید.";
        }

        if (!validator.isEmpty(userName) && (!validator.matches(userName, "^09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}$")) ) {
            isValidForm = false;
            errors['userName_inValid'] = 'شماره موبایل را به درستی وارد کنید.';
        }


        if (!validator.isEmpty(userName) && (!validator.matches(userName, "^09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}$")) && userName.length < 6) {
            isValidForm = false;
            errors['userName_length'] = 'حداقل 6 کاراکتر باید وارد شود.';
        }

        if (validator.isEmpty(password)) {
            isValidForm = false;
            errors['password_required'] = "پسورد باید وارد شود.";
        }


        if (validator.isEmpty(confirmPassword)) {
            isValidForm = false;
            errors['confirmPassword_required'] = 'تکرار پسورد باید وارد شود.';
        }

        if (password !== confirmPassword) {
            isValidForm = false;
            errors['compare_pass'] = 'پسورد و تکرارش باید برابر باشند.';
        }

        if (validator.isEmpty(Role)) {
            isValidForm = false;
            errors['role_required'] = 'نقش کاربری باید وارد شود.';
        }

        setErrors(errors);
        callback(isValidForm);

    }; // end metohd

    const onSubmit = () => {
        onValidation(isValid => {
            if (isValid) {
                setLoading(true);
                const url = '/api/Admin/User/Create';
                const formData = new FormData();
                formData.append('UserName', userName);
                formData.append('Password', password);
                formData.append('Role', Role);
                AppClient.post(url, formData).then(res => {
                    userService.add(res.data);
                    messageService.success();
                    history.push('/admin/user');
                }).catch(err => {
                    messageService.error();
                    setLoading(false);
                });
            } else {
                messageService.checkInput();
            }
        });
    };


    

    const container =
        <>
            <PageHeader title='کاربر جدید' extra={[<Button onClick={() => history.push('/admin/user')} icon={<UserOutlined />}>کاربران</Button>]} />
            <Form wrapperCol={{ span: 14 }} labelCol={{span: 4}}>
                <Form.Item label='شماره موبایل'>
                    <Input id='userName' name='userName' value={userName} onChange={e => setUserName(e.target.value)} />
                    <span style={styles.textDanger}>{errors['userName_required']}</span>
                    <span style={styles.textDanger}>{errors['userName_inValid']}</span>
                    <span style={styles.textDanger}>{errors['userName_length'] }</span>
                </Form.Item>

                <Form.Item label='نقش کاربری'>
                    <Select id='Role' name='Role' value={Role} onSelect={e => SetRole(e) }>
                        {
                            roles.map((element, key) => <Option key={key} value={element.name}>
                                <RolePersianName role={ element.name }/>
                            </Option>)
                        }
                    </Select>
                    <span style={ styles.textDanger }>{errors['role_required'] }</span>
                </Form.Item>

                <Form.Item label='پسورد'>
                    <Input.Password id='password' name='password' value={password} onChange={e => setPassword(e.target.value)} />
                    <span style={styles.textDanger}>{errors['password_required']}</span>
                </Form.Item>
                <Form.Item label='تکرار پسورد'>
                    <Input.Password id='confirmPassword' name='confirmPassword' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    <span style={styles.textDanger}>{errors['confirmPassword_required']}</span>
                </Form.Item>
                <Form.Item wrapperCol={{offset: 4}}>
                    <Button type='primary' loading={loading} onClick={() => onSubmit() }>ذخیره</Button>
                </Form.Item>
            </Form>
        </>;
    return container;
}

const styles = {
    textDanger: { color: 'red' }
};