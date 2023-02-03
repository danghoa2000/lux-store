import React from "react";
import FlashCard from "./FlashCard";
import "./style.css";

const FlashDeals = ({ productItems, addToCart }) => {
    return (
        <section className="flash">
            <div className="container">
                <div className="heading d-flex align-items-center">
                    <i className="fa fa-bolt"></i>
                    <h2>Flash Delas</h2>
                </div>
                <FlashCard productItems={productItems} addToCart={addToCart} />
            </div>
        </section>
    );
};

export default FlashDeals;
