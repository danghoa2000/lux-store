import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Tdata from "./Tdata";
import { API_BASE_URL } from "../../../constants/api";
import { auto } from "@popperjs/core";

const TopCart = ({ topGroupCategory }) => {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
    };
    return (
        <Slider {...settings}>
            {topGroupCategory?.map((value, index) => {
                return (
                    <div className="box" key={index}>
                        <div className="product">
                            <div className="nametop d-flex">
                                <span className="tleft">
                                    {value?.products_count}
                                </span>
                                <span
                                    className="tright"
                                    style={{ height: auto }}
                                >
                                    {value?.name}
                                </span>
                            </div>
                            <div className="img has__hover">
                                <img src={API_BASE_URL + value?.image} alt="" />
                            </div>
                        </div>
                    </div>
                );
            })}
        </Slider>
    );
};

export default TopCart;
