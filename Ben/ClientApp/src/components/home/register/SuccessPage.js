import React from 'react';

import { 
    Result,
    Button
} from 'antd';
import { useHistory } from 'react-router-dom';

export function SuccessPage() {
    const history = useHistory();
    return (
        <Result 
            title='حساب کاربری شما باموفقیت ایجاد شد.'
            status='success'
            extra={[<Button type='primary' onClick={ () => history.push('/login') }>ورود به حساب کاربری</Button>]}/>
    );
}