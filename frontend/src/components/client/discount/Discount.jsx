import React from "react";
import Dcard from "./Dcard";

const Discount = ({ productItems }) => {
    return (
        <section className="Discount background NewArrivals">
            <div className="container">
                <div className="heading d-flex justify-content-between align-items-center">
                    <div className="heading-left d-flex align-items-center">
                        <img src="https://img.icons8.com/windows/32/fa314a/gift.png" />
                        <h2>Big Discounts</h2>
                    </div>
                    <div className="heading-right d-flex align-items-center">
                        <span>View all</span>
                        <i className="fa-solid fa-caret-right"></i>
                    </div>
                </div>
                <Dcard productItems={productItems} />
            </div>
        </section>
    );
};

export default Discount;
