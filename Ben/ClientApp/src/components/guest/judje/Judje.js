import React, { useEffect, useState } from 'react';
import {
    Result,
    Button
} from 'antd';
import AppClient from '../../utils/AppClient';

const container = {
    backgroundColor: '#efefef',
    borderRadius: 7,
    padding: 5
}

const question = {
    fontSize: 32,
    fontFamily: 'zar',
    fontStyle: 'normal'
}


export function Judje() {

    const [loading, setLoading] = useState(false);
    const [isSend, setIsSend] = useState(false);

    useEffect(() => {
        const url = '/api/Guest/GetCurrentUser';
        AppClient.get(url).then(res => {
            let user = res.data;
            setIsSend(user.isJudje);
        });
    }, []);

    const HandleSubmit = () => {
        setLoading(true);
        const url = '/api/Guest/JudjeRequest';
        AppClient.get(url).then(res => {
            setIsSend(true);
            setLoading(false);
        }).catch(err => {
            setLoading(false);
        });
    }

    const extraTools = 
        (<span>
            <span style={question}>آیا تمایل به داوری ایده ها به عنوان داور سامانه را دارید؟</span>
            <Button type='primary' loading={loading} onClick={() => HandleSubmit()}>ارسال درخواست</Button>
        </span>);


    const mainContainer = isSend === false ?  <Result title='درخواست داوری' status='info' extra={extraTools}/> :
    <Result title='درخواست ارسال شده است.' status='success'/>;

    return(
        <div style={container}>
           {mainContainer}
        </div>
    );
}