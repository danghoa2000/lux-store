import React from "react";
import Catg from "./Catg";
import ShopCart from "./ShopCart";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Shop = ({ addToCart, shopItems, brand }) => {
    const navigate = useNavigate();
    return (
        <section className="shop background">
            <div className="container d-flex">
                <Catg brand={brand} />

                <div className="contentWidth">
                    <div className="heading d-flex justify-content-between">
                        <div className="heading-left row  ">
                            <h2>Orther Products</h2>
                        </div>
                        <div className="heading-right">
                            <span onClick={() => navigate("/elite/search")}>
                                View all
                            </span>
                            <i className="fa-solid fa-caret-right"></i>
                        </div>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        <ShopCart addToCart={addToCart} shopItems={shopItems} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Shop;
