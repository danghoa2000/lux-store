import React, { useCallback, useEffect, useState } from "react";
import OrderDetail from "./OrderDetail";
import { useLocation } from "react-router-dom";

import { useForm } from "react-hook-form";
import { axiosClient } from "../../../../../../hooks/useHttp";
import { ORDER_API } from "../../../../../../constants/api";
import { CODE } from "../../../../../../constants/constants";

const OrderDetailContainer = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({});
    const [showNoti, setShowNoti] = useState(false);
    const [order, setOrder] = useState();
    const [open, setOpen] = useState(false);
    const [type, setType] = useState(1);
    const { state } = useLocation();

    const { handleSubmit, control, reset, setValue, getValues } = useForm({
        defaultValues: {
            id: state.id,
            order_status: 0,
        },
    });

    const getOrder = useCallback(() => {
        axiosClient
            .get(ORDER_API.SHOW, {
                params: {
                    id: state.id,
                },
            })
            .then((response) => {
                if (response.data.code === CODE.HTTP_OK) {
                    setOrder(response.data.order);
                }
                if (response.data.code === CODE.HTTP_NOT_FOUND) {
                    setStatus({
                        type: "error",
                        message: response.data.message,
                    });
                    setShowNoti(true);
                }
            })
            .catch(({ response }) => {
                setStatus({
                    type: "error",
                    message: response.data
                        ? response.data.message
                        : "Server error",
                });
                setShowNoti(true);
            });
    }, []);

    const handleUpdate = (value) => {
        axiosClient
            .put(ORDER_API.UPDATE, {
                ...value,
            })
            .then((response) => {
                setShowNoti(true);
                if (response.data.code === CODE.HTTP_OK) {
                    setStatus({
                        type: "success",
                        message: response.data.message,
                    });
                    setOrder(response.data.order);
                } else if (response.data.code === CODE.HTTP_NOT_FOUND) {
                    setStatus({
                        type: "error",
                        message: response.data.message,
                    });
                } else {
                    setStatus({
                        type: "warning",
                        message: response.data
                            ? response.data.message
                            : "Update error",
                    });
                }
                setOpen(false);
            })
            .catch(({ response }) => {
                setStatus({
                    type: "error",
                    message: response.data
                        ? response.data.message
                        : "Server error",
                });
                setShowNoti(true);
                setOpen(false);
            });
    };

    useEffect(() => {
        getOrder();
    }, [state]);

    useEffect(() => {
        if (order && Object.keys(order).length > 0) {
            setValue("order_status", order?.status || 0);
        }
    }, [order]);

    return (
        <OrderDetail
            loading={loading}
            showNoti={showNoti}
            status={status}
            setStatus={setStatus}
            setShowNoti={setShowNoti}
            order={order}
            state={state}
            handleSubmit={handleSubmit}
            handleUpdate={handleUpdate}
            control={control}
            open={open}
            setOpen={setOpen}
            type={type}
            setType={setType}
            getOrder={getOrder}
        />
    );
};

export default OrderDetailContainer;
