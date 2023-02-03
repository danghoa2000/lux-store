import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { BASE_URL } from '../../../../constants/constants';
import { auto } from '@popperjs/core';
import { API_BASE_URL } from '../../../../constants/api';

const SliderProduct = (props) => {
    const {
        dots,
        slidesToShow,
        slidesToScroll,
        autoplay,
        appendDots,
        dotsClass,
        customPaging,
        data,
        slideClass
    } = props;

    let settings = {
        dots: dots,
        infinite: true,
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToScroll,
        autoplay: false,
        dotsClass: dotsClass
    }

    if (appendDots) {
        settings = {
            ...settings, appendDots: appendDots
        }
    }

    if (customPaging) {
        settings = {
            ...settings, customPaging: customPaging,
        }
    }
    return (
        <div>
            <section className={slideClass}>
                <Slider {...settings}>
                    {data && data.map((value, index) => {
                        return (
                            <div className='slide__product_image' key={index}>
                                <img src={API_BASE_URL + value} alt='' />
                            </div>
                        )
                    })}
                </Slider>
            </section>
        </div>
    )
};

export default SliderProduct;