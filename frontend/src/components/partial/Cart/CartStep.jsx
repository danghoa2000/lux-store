import React from "react";
import { formatPrice } from "../../../utils/helper";
import { Box, Button } from "@mui/material";
import { BASE_URL } from "../../../constants/constants";

const CartStep = ({
    CartItem,
    handleNext,
    addToCart,
    decreaseQty,
    totalPrice,
    activeStep,
    handleBack,
    data,
    setData,
}) => {
    return (
        <div className="container d-flex">
            {/* if hamro cart ma kunai pani item xaina bhane no diplay */}

            <div className="cart-details">
                {CartItem.length === 0 && (
                    <h1 className="no-items product">
                        No Items are add in Cart
                    </h1>
                )}

                {/* yasma hami le cart item lai display garaaxa */}
                {CartItem.map((item) => {
                    let price = item.price;
                    if (item.sale_price) {
                        price = item.price - item.sale_price;
                    }
                    const productQty = price * item.pivot.qty;

                    return (
                        <div
                            className="cart-list product cart-item d-flex"
                            key={item.id}
                        >
                            <div className="img">
                                <img
                                    src={BASE_URL + item.product.image}
                                    alt=""
                                />
                            </div>
                            <div className="cart-details">
                                <h3>{item.product.name}</h3>
                                <h4>
                                    {formatPrice(price)} * {item.pivot.qty}
                                    <span>{formatPrice(productQty)}</span>
                                </h4>
                                <h4>
                                    {Object.values(item.property_value).map(
                                        (val) => val.attribute_value_name + ", "
                                    )}
                                </h4>
                            </div>
                            <div className="cart-items-function">
                                <div className="removeCart">
                                    <button className="removeCart">
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div className="cartControl d-flex">
                                    <button
                                        className="incCart"
                                        onClick={() => addToCart(item)}
                                    >
                                        <i className="fa-solid fa-plus"></i>
                                    </button>
                                    <button
                                        className="desCart"
                                        onClick={() => decreaseQty(item)}
                                    >
                                        <i className="fa-solid fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="cart-total product">
                <h2>Cart Summary</h2>
                <div className="d-flex" style={{ alignItems: "center" }}>
                    <h4>Total Price :</h4>
                    <h3> {formatPrice(totalPrice)}</h3>
                </div>
                <Button
                    variant="contained"
                    className="btn__checkcout"
                    style={{ margin: 0 }}
                    onClick={handleNext}
                    disabled={Object.keys(CartItem).length === 0}
                >
                    Checkout Now
                </Button>
            </div>
        </div>
    );
};

export default CartStep;
