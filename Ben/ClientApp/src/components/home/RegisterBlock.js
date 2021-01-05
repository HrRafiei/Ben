import React from 'react';
import {
    Layout,
    Divider,
    Result,
    Button
} from 'antd';

export function RegisterBlock() {
    const container =
        <Layout style={{ 
            background: '#f9ca24', 
            borderRadius: 7,
            margin: '7px auto', 
            display: 'flex', 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'center'
             }}>
            <Result
                status="success"
                title="بیان ایده ها، انتخاب بهترین ها، حرکت در مسیر پیشرفت"
                subTitle="درصورتی که ایده ای دارید وتمایل به عملی شدن آن دارید، همین حالا ثبت نام کنید."
                extra={null}
            />
        </Layout>;
    return container;
}