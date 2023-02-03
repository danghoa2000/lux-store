import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
    COUNPON_API,
} from "../../../../../constants/api";
import { axiosClient } from "../../../../../hooks/useHttp";
import CouponCreate from "./CouponCreate";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { CODE, STATUS } from "../../../../../constants/constants";

const CouponCreateContainer = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [t] = useTranslation();
    const [status, setStatus] = useState({});
    const [showNoti, setShowNoti] = useState(false);
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
        qty: Yup.string().required(
            t("validate.required", { name: "Qty" })
        ),
        status: Yup.string().required(
            t("validate.required", { name: "Status" })
        ),
    });

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

    const handleCreate = useCallback((value) => {
        setLoading(true);
        axiosClient
            .post(COUNPON_API.CREATE, {
                ...value,
            })
            .then((response) => {
                if (response.data.code === CODE.HTTP_OK) {
                    setStatus({
                        type: "success",
                        message: response.data.message,
                    });
                    reset();
                    navigate(-1);
                }
                setShowNoti(true);
                setLoading(false);
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

    return (
        <CouponCreate
            redirectBack={redirectBack}
            handleCreate={handleCreate}
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

export default CouponCreateContainer;
