import React from 'react';
import {
    Form,
    Input,
    PageHeader,
    Collapse,
} from 'antd';
import { ChangePassword } from './ChangePassword';
import { UserProfile } from './UserProfile';

const {
    Panel
} = Collapse;

export function Profile() {
    return (
        <div>
            <PageHeader title='پروفایل کاربری' />
            <Collapse defaultActiveKey={["1"]}>
                <Panel header='اطلاعات عمومی' key='1'>
                    <UserProfile/>
                </Panel>
                <Panel header='تغییر پسورد' key="2">
                    <ChangePassword/>
                </Panel>
            </Collapse>
        </div>
        );
}