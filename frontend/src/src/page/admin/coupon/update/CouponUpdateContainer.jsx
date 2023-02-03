import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import {
    CATEGORIES_API,
    COUNPON_API,
    GROUP_CATEGORY_API,
} from "../../../../../constants/api";
import { axiosClient } from "../../../../../hooks/useHttp";
import CouponUpdate from "./CouponUpdate";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { CODE, STATUS } from "../../../../../constants/constants";
import { useEffect } from "react";
import { format, parseISO } from "date-fns";

const CouponUpdateContainer = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({});
    const [showNoti, setShowNoti] = useState(false);
    const [coupon, setCoupon] = useState();
    const { state } = useLocation();

    const [t] = useTranslation();
    const redirectBack = () => navigate(-1);

    const validationSchema = Yup.object().shape({
        coupon_code: Yup.string().required(
            t("validate.required", { name: "Coupon code" })
        ),
        date_start: Yup.string().required(
            t("validate.required", { name: "Date start" })
        ),
        value: Yup.string().required(
            t("validate.required", { name: "Price discount" })
        ),
        qty: Yup.string().required(t("validate.required", { name: "Qty" })),
        status: Yup.string().required(
            t("validate.required", { name: "Status" })
        ),
    });

    const getCoupon = useCallback(() => {
        axiosClient
            .get(COUNPON_API.SHOW, {
                params: {
                    id: state.id,
                },
            })
            .then((response) => {
                if (response.data.code === CODE.HTTP_OK) {
                    setCoupon(response.data.coupon);
                } else if (response.data.code === CODE.HTTP_NOT_FOUND) {
                    setStatus({
                        type: "error",
                        message: response.data.message,
                    });
                    setShowNoti(true);
                } else {
                    setStatus({
                        type: "error",
                        message: "Error!",
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
    }, [state]);

    useEffect(() => {
        getCoupon();
    }, [state]);

    const {
        handleSubmit,
        control,
        reset,
        setValue,
        getValues,
        setError,
        formState: { errors },
    } = useForm({
        shouldUnregister: false,
        defaultValues: {
            coupon_code: "",
            date_start: "",
            date_finish: "",
            value: "",
            qty: "",
            status: STATUS.ACTIVE,
        },
        resolver: yupResolver(validationSchema),
    });

    const handleUpdate = useCallback((value) => {
        setLoading(true);
        axiosClient
            .put(COUNPON_API.UPDATE, {
                ...value,
            })
            .then((response) => {
                if (response.data.code === CODE.HTTP_OK) {
                    setStatus({
                        type: "success",
                        message: response.data.message,
                    });
                }
                if (response.data.code === CODE.HTTP_NOT_FOUND) {
                    setStatus({
                        type: "error",
                        message: response.data.message,
                    });
                }
                setShowNoti(true);
                setLoading(false);
                setTimeout(() => {
                    navigate(-1);
                }, 1500);
            })
            .catch(({ response }) => {
                if (response.data.code === CODE.UNPROCESSABLE_ENTITY) {
                    Object.keys(response.data.errors).forEach((element) => {
                        setError(element, {
                            type: "custom",
                            message: Object.values(
                                response.data.errors[element]
                            ),
                        });
                    });
                }
                setStatus({
                    type: "error",
                    message: response.data
                        ? response.data.message
                        : "Server error",
                });
                setShowNoti(true);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setValue("id", coupon ? coupon.id : "");
        setValue(
            "coupon_code",
            coupon && coupon.coupon_code ? coupon.coupon_code : ""
        );
        setValue(
            "date_start",
            coupon && coupon.date_start
                ? format(parseISO(coupon.date_start), "yyyy-MM-dd")
                : ""
        );
        setValue(
            "date_finish",
            coupon && coupon.date_finish
                ? format(parseISO(coupon.date_finish), "yyyy-MM-dd")
                : ""
        );
        setValue("status", coupon ? coupon.status : -1);
        setValue("value", coupon && coupon.value ? coupon.value : "");
        setValue("qty", coupon && coupon.qty ? coupon.qty : "");
    }, [coupon]);

    return (
        <CouponUpdate
            redirectBack={redirectBack}
            handleUpdate={handleUpdate}
            handleSubmit={handleSubmit}
            control={control}
            reset={reset}
            setValue={setValue}
            getValues={getValues}
            errors={errors}
            loading={loading}
            showNoti={showNoti}
            status={status}
            setShowNoti={setShowNoti}
        />
    );
};

export default CouponUpdateContainer;
