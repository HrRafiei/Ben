import React from 'react';
import {
    Carousel,
    Image
} from 'antd';



const itemWrapper = {
    borderRadius: 7
};
const contentStyle = {
    height: '220px',
    width: '100%',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    margin: '0px auto',
    padding: 0,
    borderRadius: 7
};


export function HomeSlider() {

    function onChange(a, b, c) {
        console.log(a, b, c);
    }

    const container =
        <Carousel style={{borderRadius: 7, background: '#686de0'}} 
                  afterChange={onChange} 
                  autoplay={true}>
            <div style={itemWrapper}>
                <img style={contentStyle} src='https://www.ssorchestra.org/wp-content/uploads/2016/05/outside-background.jpg'/>
            </div>

            <div style={itemWrapper}>
                <img style={contentStyle} src='https://heart-england.co.uk/wp-content/uploads/2018/11/slider-background.png'/>
            </div>

            <div style={itemWrapper}>
                <img style={contentStyle} src='https://restaurantekanpai.com.br/templates/foundation/tpl/plugins/masterslider/slider-templates/home%20slider/img/slide2/bg.png'/>
            </div>
            <div style={itemWrapper}>
                <img style={contentStyle} src='https://www.websitesfornewspapers.com/wp-content/uploads/2015/09/slider-background.jpg'/>
            </div>
        </Carousel>;

    return container;
}