import { Input, Avatar, Button, message } from 'antd';
import {
    DeleteFilled
} from '@ant-design/icons';
import React, { useState, useRef } from 'react';
import { MessageService } from '../../services/message.service';
import AppClient from '../../utils/AppClient';

export function UserAvatar({ path }) {

    const [avatar, setAvatar] = useState(path);
    const messageService = new MessageService();

    const [localImage, setLocalImage] = useState(undefined);

    const [loading, setLoading] = useState(false);
    const RemoveProfile = () => {
        if (localImage !== undefined) {
            setLoading(true);
            const url = '/api/Guest/DeleteAvatar/' + path;
            AppClient.delete(url).then(res => {
                setLoading(false);
                messageService.success();
                setLocalImage(undefined);
                fileInput.current.value = '';
                path = res.data['avatar'];
            }).catch(err => {
                setLoading(false);
                messageService.error();
            });
        } else {
            setLocalImage(undefined);
            fileInput.current.value = '';
        }
    }

    const openUploadDialog = () => {
        fileInput.current.click();
    }

    const onChangeImage = (e) => {
        let files = e.target.files;
        if (files === null) return;

        let avatarFile = files[0];

        
        const url = '/api/Guest/UploadAvatar';
        const formData = new FormData();
        formData.append('avatar', avatarFile);
        AppClient.post(url, formData).then(res => {
            let avatarValue = res.data['avatar'];
            setAvatar(avatarValue);
            messageService.success();
            const reader = new FileReader();
            reader.readAsDataURL(avatarFile);
            reader.onload = e => {
                setLocalImage(e.target.result);
            }

        }).catch(err => {
            messageService.error();
        });
    }

    const fileInput = useRef();



    return (
        <span style={{ textAlign: 'center', padding: 25 }}>
            <Avatar size={50} src={'/' + path} onClick={() => openUploadDialog()} />
            <img src={'/' + avatar }/>
            <span>{ avatar }</span>
            <input accept="image/*" ref={fileInput} type='file' onChange={e => onChangeImage(e)} style={{ display: "none" }} />
        </span>
        );
}