import {
    Layout,
    Row,
    Col
} from 'antd';
import React from 'react';
import AppClient from '../utils/AppClient';
import { ContactUs } from './ContactUs';
import { EventSlider } from './EventSlider';
import { Footer } from './Footer';
import { HomeSlider } from './HomeSlider';
import { Ideas } from './Ideas';

import { Navigation } from './Navigation';
import { RegisterBlock } from './RegisterBlock';

const styles = {
    container: {
        backgroundColor: 'transparent',
        width: '978px',
        height: '100%',
        minHeight: 650,
        margin: '0px auto'
    }
};

export function Home() {

    const container =
        <>
            
            <Layout style={styles.container}>
                <Navigation />
                <Row style={{marginTop: 5}}>
                    <Col span={24}>
                        <HomeSlider />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <EventSlider />
                    </Col>
                </Row>

                <Row style={{marginTop: 7}}>
                    <Col span={24}>
                        <RegisterBlock />
                    </Col>
                </Row>

              
                
                

                <Row>
                    <Col span={24}>
                        <Footer />
                    </Col>
                </Row>
            </Layout>
        </>
    return container;
}
