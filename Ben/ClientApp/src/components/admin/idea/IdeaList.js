import React, { useState, useEffect } from 'react';
import {
    Empty,
    PageHeader, Table
} from 'antd';
import { DownloadExcelIdeas } from './DownloadExcelIdeas';
import AppClient from '../../utils/AppClient';

const {
    Column
} = Table;

export function IdeaList() {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);

    useEffect(() => {
        setLoading(true);
        const url = '/api/Admin/Idea/GetAll';
        AppClient.get(url).then(res => {
            setList(res.data);
            setLoading(false);
        }).catch(err => {
            setLoading(false);
        });
    },[]);


    const listDiv = list.length > 0 ?
        <Table dataSource={list}>
            <Column id='index' title='#' render={(element, text, index) => {
                return index + 1;
            }} />

            <Column title='عنوان' id='Title' dataIndex='title'/>
            <Column title='نام کاربری' id='UserName' dataIndex='userName' />
            <Column title='دسته بندی' id='categoryName' dataIndex='categoryName' />
            <Column title='رویداد' id='EventName' dataIndex='eventName' />
            <Column title='توضیحات' id='description' dataIndex='description' />

        </Table> : <Empty/>


    return(
        <span>
            <PageHeader title='ایده ها' extra={<DownloadExcelIdeas/> }>
            </PageHeader>
            {listDiv}
        </span>
    );
}