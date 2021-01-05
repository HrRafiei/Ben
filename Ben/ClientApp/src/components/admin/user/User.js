import React from 'react';
import { Route } from 'react-router-dom';
import {
    PageHeader,
    Button
} from 'antd';


import { UserList } from './UserList';
import { UserAdd } from './UserAdd';
import { ProfilePage } from './ProfilePage';

export function User() {

    let container = 
        <>
           
            <Route exact={ true } path='/admin/user' component={ UserList }/>
            <Route path='/admin/user/add' component={UserAdd} />
            <Route path='/admin/user/profile/:userId' component={ProfilePage} />
        </>;
    return container;
}