import React, { useState, useEffect } from 'react';
import { UserService } from '../../services/user.service';
import {
    useHistory
} from 'react-router-dom';
import AppClient from '../../utils/AppClient';
import {
    Empty,
    Table,
    Spin,
    Button,
    PageHeader,
    Space,
    Tag,
    Input
} from 'antd';


import { PlusOutlined, EditOutlined, DeleteOutlined, ProfileOutlined } from '@ant-design/icons';
import { RolePersianName } from './RolePersianName';

const {
    Column
} = Table;

export function UserList() {

    const [Loading, SetLoading] = useState(false);
    const userService = new UserService();
    const [list, setList] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getList();
    }, []);



    const getList = () => {
        SetLoading(true);
        const url = '/api/Admin/User/GetAll';
        AppClient.get(url).then(res => {
            setList(res.data);
            SetLoading(false);
        }).catch(err => {
            SetLoading(false);
        });
    }
 

    const listDiv = list.length > 0 ?
        <Table dataSource={list}>

            <Column id='#' title='#' render={(element, text, index) => {
                return <span>{ index + 1 }</span>
            }} />

            <Column id='PhoneNumber' title='نام کاربری' dataIndex="userName" />
            <Column id='role'
                title='نقش کاربری'
                render={role => <RolePersianName role={role.role} />} />

            <Column title='وضعیت کاربری' key='isValid' render={item => {
                const isValid = item.isValid === true ? <Tag color='green'>فعال</Tag> :
                    <Tag color='red'>بلاک</Tag>;
                return isValid;
            }} />

            <Column id='isJudje' title='تمایل به داوری' render={element => {
                const context = element.isJudje === true ? <Tag color='green'>دارد</Tag> : <Tag color='red'>ندارد</Tag>;
                return context;
            }} />


        </Table>
        : <Empty />


    const loadingDiv = Loading === true ? <Spin /> : listDiv;


    const [search, setSearch] = useState('');
    const onSearch = value => {
        setSearch(value);
        if (value === '') {
            SetLoading(true);
            const url = '/api/Admin/User/GetAll';
            AppClient.get(url).then(res => {
                setList(res.data);
                SetLoading(false);
            }).catch(err => {
                SetLoading(false);
            });
            return;
        }
        const url = '/api/Admin/User/Search/' + value;
        AppClient.get(url).then(res => {
            setList(res.data);
        });
    }


    let container =
        <>
            <PageHeader title='کاربران' extra={[
                <Button onClick={() => history.push('/admin/user/add')} icon={<PlusOutlined />}>کاربر جدید</Button>]} 
            >
                <Input id='search' name='search' value={search} onChange={e => onSearch(e.target.value)} />
            </PageHeader>
            {loadingDiv}
        </>;
    return container;
}
