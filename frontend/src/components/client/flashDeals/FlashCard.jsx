import React, { useCallback, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { formatPrice } from "../../../utils/helper";
import { Rating } from "@mui/material";
import { Star } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../constants/constants";

const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="control-btn" onClick={onClick}>
            <button className="next">
                <i className="fa fa-long-arrow-alt-right"></i>
            </button>
        </div>
    );
};
const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="control-btn" onClick={onClick}>
            <button className="prev">
                <i className="fa fa-long-arrow-alt-left"></i>
            </button>
        </div>
    );
};
const FlashCard = ({ productItems, addToCart }) => {
    const [count, setCount] = useState(0);
    const navigate = useNavigate();
    const increment = () => {
        setCount(count + 1);
    };
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    return (
        <Slider {...settings}>
            {productItems.map((items) => {
                return (
                    <div className="box" key={items.id}>
                        <div className="product mtop">
                            <div
                                className="img"
                                onClick={() =>
                                    navigate("/elite/product", {
                                        state: {
                                            id: items.id,
                                        },
                                    })
                                }
                            >
                                {items?.sale_persen ? (
                                    <span className="discount">
                                        {items?.sale_persen}% Off
                                    </span>
                                ) : (
                                    ""
                                )}
                                <img src={BASE_URL + items?.image} alt="" />
                                <div className="product-like">
                                    <label>{count}</label> <br />
                                    <i
                                        className="fa-regular fa-heart"
                                        onClick={increment}
                                    ></i>
                                </div>
                            </div>
                            <div className="product-details">
                                <h3>{items?.name}</h3>
                                <div className="rate">
                                    <Rating
                                        name="text-feedback"
                                        value={items?.total_rate || 0}
                                        readOnly
                                        precision={0.5}
                                        emptyIcon={
                                            <Star
                                                style={{ opacity: 0.55 }}
                                                fontSize="inherit"
                                            />
                                        }
                                    />
                                </div>
                                <div className="price">
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "baseline",
                                        }}
                                    >
                                        {items?.sale_price ? (
                                            <div>
                                                <span className="old-price">
                                                    {formatPrice(
                                                        items?.min_price
                                                    )}
                                                </span>
                                                <span
                                                    className="new-price"
                                                    style={{ marginLeft: 5 }}
                                                >
                                                    {formatPrice(
                                                        items?.min_price - items?.sale_price
                                                    )}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="new-price">
                                                {formatPrice(items?.min_price)}
                                            </span>
                                        )}
                                    </div>
                                    {/* step : 3  
                 if hami le button ma click garryo bahne 
                */}
                                    <button onClick={() => addToCart(items)}>
                                        <i className="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </Slider>
    );
};

export default FlashCard;
