import React, { createElement, useState } from 'react';
import {
    Layout,
    Divider,
    Carousel,
    Comment,
    Avatar,
    Tooltip,
    Row,
    Col,
    Image
} from 'antd';

import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import IdeaImage from '../../assets/img/idea.svg';


import moment from 'moment';





const IdeaItem = idea => {

    return <Comment
       
        author={<a>حمیدرضا رفیعی</a>}
        avatar={
            <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="حمیدرضا رفیعی"
            />
        }
        content={
            <p style={{textAlign: 'justify', textJustify: 'kashida', fontFamily: 'iran'}}>
                مداد رنگی ها مشغول بودند به جز مداد سفید، هیچکس به او کار نمیداد، همه میگفتند : تو به هیچ دردی نمیخوری، یک شب که مداد رنگی ها تو سیاهی شب گم شده بودند، مداد سفید تا صبح ماه کشید مهتاب کشید و انقدر ستاره کشید که کوچک و کوچکتر شد صبح توی جعبه مداد رنگی جای خالی او با هیچ رنگی  پر نشد، به یاد هم باشیم شاید فردا ما هم در کنار هم نباشیم…
            </p>
        }
        datetime={
            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().fromNow()}</span>
            </Tooltip>
        }
    />;
  
};





export function Ideas() {

  

    const container =
        <Layout style={{ background: 'transparent'}}>
            <Divider orientation='right'>آخرین ایده ها</Divider>
            <Row>
                <Col span={18}>
                    <Carousel style={{ padding: '0px 50px 20px 50px' }} autoplay>
                        <IdeaItem/>
                        <IdeaItem/>
                        <IdeaItem />
                    </Carousel>
                </Col>

                <Col span={6} style={{textAlign: 'center'}}>
                    <Image width={150} heigth={150} src={IdeaImage}/>
                </Col>

                
            </Row>
        </Layout>;
    return container;
}