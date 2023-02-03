import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Tdata from "./Tdata";
import { Rating } from "@mui/material";
import { Star } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../constants/constants";

const TopCart = ({ topRateProduct }) => {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
    };
    const navigate = useNavigate();
    return (
        <Slider {...settings}>
            {topRateProduct?.map((value, index) => {
                return (
                    <div
                        className="box"
                        key={index}
                        onClick={() =>
                            navigate("/elite/product", {
                                state: {
                                    id: value?.id,
                                },
                            })
                        }
                    >
                        <div className="product">
                            <div className="img">
                                {value?.sale_persen ? (
                                    <span className="discount">
                                        {value?.sale_persen}% Off
                                    </span>
                                ) : (
                                    ""
                                )}
                                <img src={BASE_URL + value?.image} alt="" />
                            </div>
                            <span className="tleft">
                                {value?.products_count}
                            </span>
                            <span className="tright">{value?.name}</span>
                            <Rating
                                name="text-feedback"
                                value={value?.total_rate || 0}
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
                    </div>
                );
            })}
        </Slider>
    );
};

export default TopCart;
