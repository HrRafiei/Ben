import React from 'react';
import { Route } from 'react-router-dom';
import {
    PageHeader
} from 'antd';

import { EventAdd } from './EventAdd';
import { EventList } from './EventList';
import { EventEdit } from './EventEdit';
import { EventDelete } from './EventDelete';

export function Event() {


    let container =
        <>
            <Route exact={ true } path='/admin/event/' component={ EventList }/>
            <Route path='/admin/event/add' component={EventAdd} />
            <Route path='/admin/event/edit/:id' component={EventEdit} />
            <Route path='/admin/event/delete/:id' component={EventDelete} />
        </>;
    return container;
}
