import React, { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { GROUP_CATEGORY_API } from "../../../../../constants/api";
import { axiosClient } from "../../../../../hooks/useHttp";
import GroupCategoryCreate from "./GroupCategoryCreate";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { CODE, STATUS } from "../../../../../constants/constants";

const GroupCategoryCreateContainer = () => {
    const navigate = useNavigate();
    const [toggleDirection, setToggleDirection] = useState(false);
    const [loading, setLoading] = useState(false);
    const [t] = useTranslation();
    const [status, setStatus] = useState({});
    const [showNoti, setShowNoti] = useState(false);
    const redirectBack = () => navigate(-1);

    const avatarRef = useRef();

    const validationSchema = Yup.object().shape({
        group_category_code: Yup.string().required(
            t("validate.required", { name: "Group Category code" })
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
            group_category_code: "",
            name: "",
            status: STATUS.ACTIVE,
        },
        resolver: yupResolver(validationSchema),
    });

    const handleCreate = useCallback((value) => {
        setLoading(true);
        axiosClient
            .post(GROUP_CATEGORY_API.CREATE, {
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
        <GroupCategoryCreate
            redirectBack={redirectBack}
            handleCreate={handleCreate}
            toggleDirection={toggleDirection}
            setToggleDirection={setToggleDirection}
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
            avatarRef={avatarRef}
        />
    );
};

export default GroupCategoryCreateContainer;
