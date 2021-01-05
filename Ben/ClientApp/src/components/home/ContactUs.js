import {
    Layout,
    Divider,
    Form,
    Input,
    Row,
    Col,
    Button,
    Image
} from 'antd';
import React from 'react';

import contactUsImage from '../../assets/img/contactUs.svg';

const {
    TextArea
} = Input;

const styles = {
    container: {
        background: 'transparent'
    },
    image: {
        textAlign: 'center'
    }
};

export function ContactUs() {
    const container =
        <Layout style={styles.container}>
            <Divider orientation="right" style={{ color: '#ffffff', fontFamily: 'iran' }}>تماس باما</Divider>
            <Row>

                <Col span={6} style={{textAlign: 'center'}}>
                    <Image width={200} height={200} src={contactUsImage}/>
                </Col>

                <Col span={18}>
                    <Form wrapperCol={{ span: 19 }} labelCol={{ span: 5 }}>
                        <Form.Item label='نام'>
                            <Input id='FullName' name='FullName' />
                        </Form.Item>
                        <Form.Item label='شماره موبایل'>
                            <Input id='PhoneNumber' name='PhoneNumber' />
                        </Form.Item>
                        <Form.Item label='محتوای پیام'>
                            <TextArea></TextArea>
                        </Form.Item>
                        <Form.Item wrapperCol={{offset: 5}}>
                            <Button type='primary'>ارسال</Button>
                        </Form.Item>
                    </Form>
                </Col> 

            </Row>
        </Layout>;
    return container;
}