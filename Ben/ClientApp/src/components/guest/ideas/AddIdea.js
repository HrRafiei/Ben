import React, { useEffect, useState } from 'react';
import {
    useHistory
} from 'react-router-dom';
import AppClient from '../../utils/AppClient';
import validator from 'validator';
import { MessageService } from '../../services/message.service'


import { PlusOutlined } from '@ant-design/icons';

import {
    Form,
    Button,
    PageHeader,
    Input,
    Select,
    Empty,
    Spin,
    Space,
    Divider
} from 'antd';

const {
    TextArea
} = Input;

const {
    Option
} = Select;

export function AddIdea() {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const [events, setEvents] = useState([]);
    const [loadingEvents, setLoadingEvents] = useState(false);

    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(false);

    const [tags, setTags] = useState([]);
    const [loadingTags, setLoadingTags] = useState(false);

    const messageService = new MessageService();
    const history = useHistory();

    function getCategories() {
        setLoadingCategories(true);
        const url = '/api/Guest/GetCategories';
        AppClient.get(url).then(res => {
            setCategories(res.data);
            setLoadingCategories(false);
        }).catch(err => {
            setLoadingCategories(false);
        });
    }

    function getEvents() {
        setLoadingEvents(true);
        const url = '/api/Guest/GetEvents';
        AppClient.get(url).then(res => {
            setEvents(res.data);
            setLoadingEvents(false);
        }).catch(err => {
            setLoadingEvents(false);
        });
    }


    function getTags() {
        setLoadingTags(true);
        const url = '/api/Guest/GetTags';
        AppClient.get(url).then(res => {
            console.log(res.data);
            setTags(res.data);
        });
    }


    useEffect(() => {
        getEvents();
        getCategories();
        getTags();
    }, []);


    const eventListDiv = events.length > 0 ?
        events.map((item, key) =>
            <Option key={key} value={item.id}>
                <Space direction='vertical' size='small'>
                    <span>{item.name}</span>
                    <p>{item.description}</p>
                </Space>
            </Option>)
        : <Empty description={<span>رویدادی وجود ندارد</span>} />;
    const loadingEventsDiv = loadingEvents === true ? <Spin /> : eventListDiv;


    const categoryList = categories.length > 0 ?
        categories.map((item, key) => <Option key={key} value={item.id}>{item.name}</Option>)
        : <Empty description={<span>دسته بندی وجود ندارد</span>} />;
    const loadingCategoriesDiv = loadingCategories === true ? <Spin /> : categoryList;


    const tagsList = tags.length > 0 ?
        tags.map((item, key) => {
            return (
                <Option key={key} value={item.id}>{item.name}</Option>
            );
        }) : null;


    const [eventId, setEventId] = useState('');
    const [title, setTitle] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [choosedTags, setChoosedTags] = useState([]);
    const [Description, setDescription] = useState('');

    const onValidation = callback => {
        let isValidForm = true;
        let errors = {};

        if (validator.isEmpty(eventId)) {
            isValidForm = false;
            errors['eventId_required'] = <span className='text-danger'>رویداد باید انتخاب شود.</span>;
        }

        if (validator.isEmpty(title)) {
            isValidForm = false;
            errors['title_required'] = <span className='text-danger'>عنوان باید مشخص شود.</span>;
        }

        if (validator.isEmpty(categoryId)) {
            isValidForm = false;
            errors['categoryId_required'] = <span className='text-danger'>دسته بندی باید انتخاب شود.</span>;
        }



        if (validator.isEmpty(Description)) {
            isValidForm = false;
            errors['description_required'] = <span className='text-danger'>در مورد ایده باید توضیح بدهید.</span>;
        }

        callback(isValidForm);
        setErrors(errors);
    }

    const [newTag, setNewTag] = useState('');
    const addTag = () => {
        const url = '/api/Guest/AddTag';
        const formData = new FormData();
        formData.append('Name', newTag);
        AppClient.post(url, formData).then(res => {
            getTags();
            setNewTag('');
        });
    }

    const onSubmit = () => {
        onValidation(isValid => {
            if (isValid) {
                setLoading(true);
                const url = '/api/Guest/AddIdea';
                const formData = new FormData();
                formData.append('Title', title);
                formData.append('EventId', eventId);
                formData.append('CategoryId', categoryId);
                formData.append('Tags', choosedTags);
                formData.append('Description', Description);

                AppClient.post(url, formData).then(res => {
                    messageService.success();
                    setLoading(false);
                    history.push('/guest/idea');
                }).catch(err => {
                    setLoading(false);
                    messageService.error();
                });

            } else {
                messageService.checkInput();
            }
        });
    }

    return (
        <span>
            <PageHeader title='افزودن ایده جدید' subTitle='درصورت ثبت ایده دیگر توانایی ویرایش نخواهید داشت.' />
            <Form wrapperCol={{ span: 14 }} labelCol={{ span: 4 }}>

                <Form.Item label='رویداد'>
                    <Select id={'EventId'}
                        name={'EventId'}
                        value={eventId}
                        onSelect={e => setEventId(e)}>
                        {loadingEventsDiv}
                    </Select>
                    {errors['eventId_required']}
                </Form.Item>

                <Form.Item label='عنوان ایده'>
                    <Input id={'Title'}
                        name={'Title'}
                        value={title}
                        onChange={e => setTitle(e.target.value)} />
                    {errors['title_required']}
                </Form.Item>

                <Form.Item label='دسته بندی'>
                    <Select
                        id={'CategoryId'}
                        name={'CategoryId'}
                        value={categoryId}
                        onSelect={e => setCategoryId(e)}>
                        {loadingCategoriesDiv}
                    </Select>
                    {errors['categoryId_required']}
                </Form.Item>
                <Form.Item label='برجسب ها'>
                    <Select id={'ChoosedTags'}
                        name={'ChoosedTags'}
                        value={choosedTags}
                        mode="tags"
                        onChange={e => setChoosedTags(e)}
                        dropdownRender={(menu) => (
                            <div>
                                {menu}
                                <Divider style={{ margin: '4px 0' }} />
                                <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>

                                    <a
                                        style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                        onClick={() => addTag()}
                                    >
                                        <PlusOutlined />افزودن
                                    </a>

                                    <Input style={{ flex: 'auto' }} id='NewTag' name='NewTag' value={newTag} onChange={e => setNewTag(e.target.value)} />

                                </div>
                            </div>
                        )}>

                        {tagsList}
                    </Select>
                </Form.Item>
                <Form.Item label='شرح ایده'>
                    <TextArea id={'Description'}
                        name={'Description'}
                        value={Description}
                        onChange={e => setDescription(e.target.value)}
                        rows={7}></TextArea>
                    {errors['description_required']}
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4 }}>
                    <Button type='primary' loading={loading} onClick={() => onSubmit()}>ثبت ایده</Button>
                </Form.Item>
            </Form>
        </span>
    );

}