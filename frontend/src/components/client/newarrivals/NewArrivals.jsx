import React from "react";
import Cart from "./Cart";
import "./style.css";

const NewArrivals = ({ productItems }) => {
    return (
        <section className="NewArrivals background">
            <div className="container">
                <div className="heading d-flex justify-content-between align-items-center">
                    <div className="heading-left d-flex align-items-center">
                        <img src="https://img.icons8.com/glyph-neue/64/26e07f/new.png" />
                        <h2>New Arrivals </h2>
                    </div>
                    <div className="heading-right d-flex align-items-center">
                        <span>View all</span>
                        <i className="fa-solid fa-caret-right"></i>
                    </div>
                </div>

                <Cart productItems={productItems} />
            </div>
        </section>
    );
};

export default NewArrivals;
