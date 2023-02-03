import {
    Breadcrumbs,
    Button,
    Divider,
    FormControl,
    Grid,
    IconButton,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import OrderStatus from "./OrderStatus";
import { format } from "date-fns";
import { parseISO } from "date-fns/esm";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import { Edit, EditAttributes, ShoppingBag } from "@mui/icons-material";
import UpdateStatusModal from "./UpdateStatusModal";
import { useState } from "react";
import { formatPrice } from "../../../../../../utils/helper";
import ShowSnackbars from "../../../../../../components/partial/ShowSnackbars";
import BasicModal from "../../../../../../components/partial/BasicModal";
import { BASE_URL, STATUS_ORDER } from "../../../../../../constants/constants";
import ReviewModal from "../../../../../../components/partial/Modal/ReviewModal";
import { useAuth } from "../../../../../../hooks/useAuth";
import ShowReviewModal from "../../../../../../components/partial/Modal/ShowReviewModal";

const OrderDetail = ({
    loading,
    showNoti,
    status,
    setShowNoti,
    order,
    state,
    handleSubmit,
    handleUpdate,
    control,
    open,
    setOpen,
    type,
    setType,
    setStatus,
    getOrder,
}) => {
    const ADDRESS = useMemo(
        () => (order?.address ? JSON.parse(order?.address) : {}),
        [order]
    );
    const [t] = useTranslation();
    const navigate = useNavigate();
    const [productReview, setProductReview] = useState();
    const [productIdReview, setProductIdReview] = useState();
    const { user } = useAuth();
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center profile__bar__item-active">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <ShoppingBag></ShoppingBag>
                    <Typography
                        variant="h6"
                        margin={"0"}
                        style={{ fontWeight: "bold" }}
                    >
                        Orders
                    </Typography>
                </div>

                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <Button
                        variant="contained"
                        color="info"
                        onClick={() => navigate(-1)}
                        style={{ textTransform: "none" }}
                    >
                        Back
                    </Button>
                </Breadcrumbs>
            </div>
            <div className="card__admin light__mode" style={{ marginTop: 20 }}>
                <OrderStatus order={order} />
            </div>

            <div className="card__admin light__mode">
                <div className="order__header">
                    <div className="order__id">{`Order ID: ${order?.id}`}</div>
                    <div className="order__placed">
                        {`Placed on: ${
                            order?.created_at
                                ? format(
                                      parseISO(order?.created_at),
                                      "dd MMM, yyyy"
                                  )
                                : ""
                        }`}
                    </div>
                    <div className="order__finish">
                        {`Delivered on: ${
                            order?.updated_at
                                ? format(
                                      parseISO(order?.updated_at),
                                      "dd MMM, yyyy"
                                  )
                                : ""
                        }`}
                    </div>
                    <div className="order__tool">
                        <IconButton
                            aria-label="edit"
                            size="small"
                            onClick={() => {
                                return order?.status == 3 ? {} : setOpen(true);
                            }}
                        >
                            <Edit fontSize="inherit" />
                        </IconButton>
                    </div>
                </div>

                <div className="order__product" style={{ marginTop: 50 }}>
                    {order?.order_detail &&
                        order?.order_detail.map((item) => {
                            return (
                                <div
                                    className="order__product__item"
                                    key={item.id}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            flex: 1,
                                        }}
                                    >
                                        <img
                                            src={BASE_URL + item?.product.image}
                                            style={{ maxWidth: 125, cursor: 'pointer' }}
                                            alt=""
                                            onClick={() => navigate('/elite/product', {
                                                state: {
                                                    id: item?.product_id
                                                }
                                            })}
                                        />

                                        <div className="order__product__item-name">
                                            <Typography variant="h6">
                                                {item?.pivot?.product_name}
                                            </Typography>
                                            <p
                                                style={{
                                                    color: "rgb(125, 135, 156)",
                                                    fontSize: 14,
                                                    margin: 0,
                                                }}
                                            >{`${formatPrice(
                                                item?.pivot?.product_price
                                            )} x ${item?.pivot?.qty}`}</p>
                                        </div>
                                    </div>

                                    <div className="order__product__item-properties">
                                        {`Product properties: ${
                                            item?.property_value &&
                                            Object.values(
                                                item.property_value
                                            ).map(
                                                (val) =>
                                                    val.attribute_value_name +
                                                    ", "
                                            )
                                        }`}
                                    </div>
                                    {order?.status == STATUS_ORDER.SUCCESS ? (
                                        <div className="order__product__item-properties">
                                            {item?.product?.customer_review &&
                                            JSON.parse(
                                                item?.product?.customer_review
                                            ).includes(user?.id) ? (
                                                <Button
                                                    variant="contained"
                                                    className="btn__view_cart"
                                                    onClick={() => {
                                                        setOpen(true);
                                                        setType(3);
                                                        setProductIdReview(
                                                            item?.product_id
                                                        );
                                                    }}
                                                >
                                                    Show a Review
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="contained"
                                                    className="btn__view_cart"
                                                    onClick={() => {
                                                        setOpen(true);
                                                        setType(2);
                                                        setProductReview(item);
                                                    }}
                                                >
                                                    Write a Review
                                                </Button>
                                            )}
                                        </div>
                                    ) : (<div className="order__product__item-properties"></div>)
                                
                                }
                                </div>
                            );
                        })}
                </div>
            </div>

            <Grid
                container
                sx={{ margin: 0, padding: 0, width: "100%" }}
                spacing={10}
            >
                <Grid item xs={6} style={{ padding: "0 10px 0 0" }}>
                    <div className="card__admin light__mode">
                        <Typography
                            variant="h7"
                            className="color-title"
                            style={{ fontWeight: "bold" }}
                        >
                            Shipping Address
                        </Typography>
                        <div className="address">
                            <div style={{ flexGrow: 1, flexShrink: 1 }}>
                                <div className="address__contact">
                                    <Typography variant="h8">
                                        {ADDRESS?.full_name}
                                    </Typography>
                                    <span
                                        style={{
                                            borderLeft:
                                                "1px solid rgba(0,0,0,.26)",
                                            margin: "0 8px",
                                        }}
                                    ></span>
                                    <Typography variant="h8">
                                        {ADDRESS?.telephone}
                                    </Typography>
                                </div>
                                <Typography variant="h8">
                                    {ADDRESS?.address}
                                </Typography>
                            </div>
                        </div>
                        <Typography
                            variant="h7"
                            className="color-title"
                            style={{ fontWeight: "bold", marginTop: 10 }}
                        >
                            Payment method
                        </Typography>

                        <Typography variant="h8">
                            {t(`payment_method.${order?.payment_method || 0}`)}
                        </Typography>

                        <Typography
                            variant="h7"
                            className="color-title"
                            style={{ fontWeight: "bold", marginTop: 10 }}
                        >
                            Note
                        </Typography>

                        <Typography variant="h8">
                            {order?.note || "Null"}
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={6} style={{ padding: "0 0 0 10px" }}>
                    <div className="card__admin light__mode">
                        <Typography
                            className="color-title"
                            variant="h6"
                            style={{ fontWeight: "bold" }}
                        >
                            Total Summary
                        </Typography>
                        <div className="cart-total product">
                            <div className="cart-total__box">
                                <div className="box__price">
                                    <Typography
                                        variant="h7"
                                        className="box__price__label"
                                    >
                                        Subtotal:
                                    </Typography>
                                    <Typography
                                        variant="h7"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        {formatPrice(
                                            (order?.price || 0) +
                                                (order?.price_discount || 0)
                                        )}
                                    </Typography>
                                </div>

                                <div className="box__price">
                                    <Typography
                                        variant="h7"
                                        className="box__price__label"
                                    >
                                        Shipping:
                                    </Typography>
                                    <Typography
                                        variant="h7"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        -
                                    </Typography>
                                </div>

                                <div className="box__price">
                                    <Typography
                                        variant="h7"
                                        className="box__price__label"
                                    >
                                        Tax:
                                    </Typography>
                                    <Typography
                                        variant="h7"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        -
                                    </Typography>
                                </div>

                                <div className="box__price">
                                    <Typography
                                        variant="h7"
                                        className="box__price__label"
                                    >
                                        Discount:
                                    </Typography>
                                    <Typography
                                        variant="h7"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        {formatPrice(
                                            order?.price_discount || 0
                                        )}
                                    </Typography>
                                </div>
                            </div>
                            <h3
                                style={{
                                    textAlign: "right",
                                    fontWeight: "bold",
                                }}
                            >
                                {" "}
                                {formatPrice(order?.price || 0)}
                            </h3>
                        </div>
                    </div>
                </Grid>
            </Grid>
            {open && (
                <BasicModal open={open} handleClose={() => setOpen(false)}>
                    {type == 1 && (
                        <UpdateStatusModal
                            handleUpdate={handleUpdate}
                            handleSubmit={handleSubmit}
                            control={control}
                            loading={loading}
                        />
                    )}
                    {type == 2 && (
                        <ReviewModal
                            product={productReview}
                            setStatus={setStatus}
                            setShowNoti={setShowNoti}
                            setOpen={setOpen}
                            getOrder={getOrder}
                        />
                    )}

                    {type == 3 && (
                        <ShowReviewModal
                            productId={productIdReview}
                            setStatus={setStatus}
                            setShowNoti={setShowNoti}
                            setOpen={setOpen}
                        />
                    )}
                </BasicModal>
            )}
            {showNoti && (
                <ShowSnackbars
                    type={status.type}
                    message={status.message}
                    setShowNoti={setShowNoti}
                />
            )}
        </div>
    );
};

export default OrderDetail;
