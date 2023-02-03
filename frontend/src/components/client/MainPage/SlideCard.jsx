import React from "react";
import Sdata from "./Sdata";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BASE_URL } from "../../../constants/constants";

const SlideCard = (props) => {
    const {
        dots,
        slidesToShow,
        slidesToScroll,
        autoplay,
        appendDots,
        dotsClass,
        customPaging,
        slideClass,
    } = props;

    let settings = {
        dots: dots,
        infinite: true,
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToScroll,
        autoplay: autoplay,
        dotsClass: dotsClass,
    };

    if (appendDots) {
        settings = {
            ...settings,
            appendDots: appendDots,
        };
    }

    if (customPaging) {
        settings = {
            ...settings,
            customPaging: customPaging,
        };
    }
    return (
        <section className={slideClass}>
            <Slider {...settings}>
                {Sdata.map((value, index) => {
                    return (
                        <div className="box d-flex top" key={index}>
                            <div className="left">
                                <h1>{value.title}</h1>
                                <p>{value.desc}</p>
                                <button className="btn-primary">
                                    Visit Collections
                                </button>
                            </div>
                            <div className="right">
                                <img src={BASE_URL + value.cover} alt="" />
                            </div>
                        </div>
                    );
                })}
            </Slider>
        </section>
    );
};

export default SlideCard;
