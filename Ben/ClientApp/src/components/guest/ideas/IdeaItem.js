import React , {useState, useEffect} from 'react';
import {
    Divider,
    Timeline,
    Spin
} from 'antd';
import AppClient from '../../utils/AppClient';

const descriptionPanel = {
    background: '#efefef',
    border: '1px dashed #fdfdfd',
    textAlign: 'justify',
    textJustify: 'kashida',
    width: 650,
    padding: 5,
    borderRadius: 7,
    fontFamily: 'iran',
    marginRight: 55
};

export function IdeaItem({event}) {

    const [loading, setLoading] = useState(false);
    const [ideas, setIdeas] = useState([]);

    useEffect(() => {
        setLoading(true);
        const url = '/api/Guest/GetEventIdeasByUserId/' + event.id;
        AppClient.get(url).then(res => {
            setIdeas(res.data);
            setLoading(false);
            console.log(res.data);
        }).catch(err => {
            setLoading(false);
        });
    }, []);


    const ideaList = ideas.length >  0 ? 
        ideas.map((item, key) => (
            <Timeline key={key}>
                <span>
                    <span style={{fontFamily: 'zar', fontStyle: 'italic'}}>ایده شماره</span>
                    <span style={{fontFamily: 'zar', fontStyle: 'italic'}}>{key + 1} : </span>
                    <strong >{item.title}</strong>
                </span>
                <p style={descriptionPanel}>{item.description}</p>
            </Timeline>
        )) : null;

            
    const loadingDiv = loading === true ? <Spin/> : ideaList;

    return(
        <>
            <Timeline.Item>
                    <strong style={{fontFamily: 'zar', fontStyle: 'italic'}}>رویداد: {event.name}</strong>
                    {loadingDiv}
            </Timeline.Item>
        </>
    );
}