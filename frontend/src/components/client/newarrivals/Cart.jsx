import React from "react";
import Slider from "react-slick";
import { formatPrice } from "../../../utils/helper";
import Ndata from "./Ndata";
import ProductItem from "./ProductItem";

const Cart = ({ productItems }) => {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
    };
    return (
        <Slider {...settings} className="content grid product">
            {productItems.map((val, index) => {
                return <ProductItem val={val} key={index} />;
            })}
        </Slider>
    );
};

export default Cart;
