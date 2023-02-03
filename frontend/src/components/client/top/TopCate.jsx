import React from "react";
import "./style.css";
import TopCart from "./TopCart";

const TopCate = ({ topGroupCategory }) => {
    return (
        <section className="TopCate" style={{ width: "100%" }}>
            <div className="">
                <div className="heading d-flex justify-content-between align-items-center">
                    <div className="heading-left d-flex align-items-center">
                        <i className="fa-solid fa-border-all"></i>
                        <h2>Top Categories</h2>
                    </div>
                    <div className="heading-right d-flex align-items-center">
                        <span>View all</span>
                        <i className="fa-solid fa-caret-right"></i>
                    </div>
                </div>
                <TopCart topGroupCategory={topGroupCategory} />
            </div>
        </section>
    );
};

export default TopCate;
