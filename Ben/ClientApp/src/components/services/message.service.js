import {
    message
} from 'antd';

export class MessageService {
    success = () =>  {
        message.success('عملیات باموفقیت انجام شد.');
    }
    error = () => {
        message.error('خطا رخ داد.');
    }

    checkInput = () => {
        message.warn('ورودی های خود را بررسی کنید.');
    }
}