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
import { formatPrice } from "../../../../../utils/helper";
import { BASE_URL, STATUS_ORDER } from "../../../../../constants/constants";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import ShowSnackbars from "../../../../../components/partial/ShowSnackbars";
import { Edit, EditAttributes } from "@mui/icons-material";
import BasicModal from "../../../../../components/partial/BasicModal";
import UpdateStatusModal from "./UpdateStatusModal";
import { useState } from "react";

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
}) => {
    const ADDRESS = useMemo(
        () => (order?.address ? JSON.parse(order?.address) : {}),
        [order]
    );
    const [t] = useTranslation();
    const navigate = useNavigate();
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <Typography variant="h4" gutterBottom>
                    Orders
                </Typography>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <Link to="/admin">Home</Link>
                    <Link to="/admin/orders">Order</Link>
                    <Typography>Detail</Typography>
                    <Typography>{state?.id}</Typography>
                </Breadcrumbs>
            </div>
            <div className="card__admin">
                <OrderStatus order={order} />
            </div>
            <Button
                variant="contained"
                color="info"
                onClick={() => navigate(-1)}
                style={{ textTransform: "none", margin: "10px 0" }}
            >
                Back
            </Button>
            <div className="card__admin" style={{ boxShadow: "none" }}>
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
                                            style={{ maxWidth: 125 }}
                                            alt=""
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
                                    <div className="order__product__item-properties"></div>
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
                    <div className="card__admin">
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
                            {t(`payment_method.${order?.payment_method || 1}`)}
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
                    <div className="card__admin">
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
                    <UpdateStatusModal
                        handleUpdate={handleUpdate}
                        handleSubmit={handleSubmit}
                        control={control}
                        loading={loading}
                    />
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
