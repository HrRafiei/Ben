import React from 'react';
import { Route } from 'react-router-dom';
import { Navigation } from './Navigation';

import {
    Layout
} from 'antd';
import { Ideas } from './ideas/Ideas';
import { AddIdea } from './ideas/AddIdea';
import { Judje } from './judje/Judje';
import { Profile } from './profile/Profile';


const wrapper = {
    margin: '5px auto',
    width: 978,
    background: '#ffffff'
};

export function Guest() {
    return (
        <>
            <Navigation/>
            <Layout style={wrapper}>
                <Route path='/guest/idea' component={Ideas}/>
                <Route path='/guest/profile' component={Profile} />
                <Route path='/guest/judje' component={Judje}/>
                <Route path='/guest/addIdea/:eventId?' component={AddIdea}/>
            </Layout>
        </>
    );
}