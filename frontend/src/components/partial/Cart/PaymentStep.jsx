import React from "react";
import Paypal from "./Paypal";
import {
    Button,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";
import { formatPrice } from "../../../utils/helper";
import { number } from "yup";

const PaymentStep = ({
    handleNext,
    totalPrice,
    activeStep,
    handleBack,
    data,
    setData,
    handelSubmit,
}) => {
    return (
        <div className="container d-flex">
            <div className="cart-details">
                <div className="cart-list product">
                    <FormControl>
                        <RadioGroup
                            name="payment_method"
                            value={data.paymentMethod}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    paymentMethod: e.target.value,
                                })
                            }
                            className="ligth__mode"
                        >
                            <FormControlLabel
                                value="1"
                                control={<Radio />}
                                label="Pay on delivery"
                            />
                            <FormControlLabel
                                value="2"
                                control={<Radio />}
                                label={"Pay with Paypal"}
                            />
                            {data.paymentMethod == "2" && (
                                <div
                                    style={{
                                        height:
                                            data.paymentMethod == "2"
                                                ? "auto"
                                                : "0",
                                        position: "relative",
                                        overflow: "hidden",
                                        transition: "height 0.5s",
                                        display:
                                            data.paymentMethod == "2"
                                                ? "block"
                                                : "none",
                                    }}
                                >
                                    <Paypal
                                        totalPrice={totalPrice}
                                        handelSubmit={handelSubmit}
                                        data={data}
                                        setData={setData}
                                    />
                                </div>
                            )}
                        </RadioGroup>
                    </FormControl>
                </div>
                <Button
                    variant="contained"
                    className="btn__view_cart"
                    onClick={handleBack}
                >
                    Back to checkout details
                </Button>
                <Button
                    variant="contained"
                    className="btn__checkcout"
                    disabled={data.paymentMethod == "2"}
                    onClick={() => handelSubmit(data)}
                >
                    Confirm
                </Button>
            </div>

            <div className="cart-total product">
                <div className="cart-total__box">
                    <div className="box__price">
                        <Typography variant="h7" className="box__price__label">
                            Subtotal:
                        </Typography>
                        <Typography variant="h7" style={{ fontWeight: "bold" }}>
                            {formatPrice(totalPrice)}
                        </Typography>
                    </div>

                    <div className="box__price">
                        <Typography variant="h7" className="box__price__label">
                            Shipping:
                        </Typography>
                        <Typography variant="h7" style={{ fontWeight: "bold" }}>
                            {data.shipping}
                        </Typography>
                    </div>

                    <div className="box__price">
                        <Typography variant="h7" className="box__price__label">
                            Tax:
                        </Typography>
                        <Typography variant="h7" style={{ fontWeight: "bold" }}>
                            0
                        </Typography>
                    </div>

                    <div className="box__price">
                        <Typography variant="h7" className="box__price__label">
                            Discount:
                        </Typography>
                        <Typography variant="h7" style={{ fontWeight: "bold" }}>
                            {data?.voucher && data?.voucher?.value
                                ? data.voucher?.value
                                : 0}
                        </Typography>
                    </div>
                </div>
                <h3 style={{ textAlign: "right" }}>
                    {formatPrice(
                        Number(totalPrice) -
                            (Number(data?.voucher?.value || 0) +
                                Number(data.shipping))
                    )}
                </h3>
                <label htmlFor="" style={{ marginBottom: 10 }}>
                    <span
                        style={{
                            fontSize: 12,
                            color: "rgb(233, 69, 96)",
                            margin: "0 10px",
                            padding: "3px 10px",
                            backgroundColor: "rgb(255, 225, 230)",
                            borderRadius: 3,
                        }}
                    >
                        Note
                    </span>
                    <Typography variant="h7" style={{ display: "block" }}>
                        {data.note}
                    </Typography>
                </label>
            </div>
        </div>
    );
};

export default PaymentStep;
