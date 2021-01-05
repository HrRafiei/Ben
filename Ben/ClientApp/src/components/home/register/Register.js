import React from 'react';
import {
    Layout,
    Row,
    Col,
    Spin
} from 'antd';

import turtle from '../../../assets/img/Turtle.jpg';
import { RegisterForm } from './RegisterForm';
import { Route } from 'react-router-dom';
import { Verify } from './Verify';
import { SuccessPage } from './SuccessPage';

const styles  = {
    container: {
        margin: '0px auto',
        width: '976px',
        marginTop: 120,
        position: 'absolute',
        right: 0,
        left: 0,
        boxShadow: '3px 2px 3px 1px #cccccc',
        borderRadius: 7,
        borderRadiusTopRigth:0,
        borderRadiusTopLeft:0,
        fontFamily: 'iran'
    },
    
};

export function Register() {

    const loadingImage = turtle !== null ? <img style={styles.image} src={turtle} /> : <Spin/>

    const container = 
    <Layout style={styles.container}>
        
        <Row>
            <Col span={12} offset={6}>
                <Route exact={true} path='/register' component={RegisterForm}/>
                <Route path='/register/verify/:phoneNumber' component={Verify}/>
                <Route path='/register/success' component={SuccessPage}/>
            </Col>
        </Row>
    </Layout>;
    return container;
}