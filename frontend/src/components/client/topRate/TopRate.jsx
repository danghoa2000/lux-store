import React from "react";
import "./style.css";
import TopCart from "./TopCart";

const TopRate = ({ topRateProduct }) => {
    return (
        <section className="" style={{ width: "100%" }}>
            <div className="">
                <div className="heading d-flex justify-content-between align-items-center">
                    <div className="heading-left d-flex align-items-center">
                        <i className="fa-solid fa-star"></i>
                        <h2>Top Rating</h2>
                    </div>
                    <div className="heading-right d-flex align-items-center">
                        <span>View all</span>
                        <i className="fa-solid fa-caret-right"></i>
                    </div>
                </div>
                <TopCart topRateProduct={topRateProduct} />
            </div>
        </section>
    );
};

export default TopRate;
