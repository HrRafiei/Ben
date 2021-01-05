import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';
import ReactExport from 'react-data-export';
import AppClient from '../../utils/AppClient';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export function DownloadExcelIdeas() {

    const [list, setList] = useState([]);
    useEffect(() => {
        const url = '/api/Admin/Idea/GetAll';
        AppClient.get(url).then(res => {
            setList(res.data);
        });
    }, []);

    return (
        <ExcelFile element={<Button type='default' icon={<FileExcelOutlined /> }>فایل اکسل</Button> }>
            <ExcelSheet data={list} name="Employees">
                <ExcelColumn label="عنوان" value="title" />
                <ExcelColumn label="رویداد" value="eventName" />
                <ExcelColumn label="توضیحات" value="description" />
                <ExcelColumn label="نام کاربری" value="userName" />
                <ExcelColumn label="دسته بندی" value="categoryName" />
            </ExcelSheet>
        </ExcelFile>
        );
}