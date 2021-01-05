import React from 'react';
import {
    Layout,
    Button,
    List,
    Typography
} from 'antd';

const {
    Text
} = Typography;


const styles = {
    copyRight: {
        color: '#efefef',
        fontFamily: 'iran',
        fontSize: 12
    }
};

export function Footer() {
    const container =
        <Layout style={{
            background: '#303952',
            textAlign: 'center',
            padding: 5
        }}>
            <Text style={ styles.copyRight }>کلیه حقوق مادی و معنوی محفوظ است.</Text>
        </Layout>;
    return container;
}