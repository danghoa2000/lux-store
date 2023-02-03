import React, { useCallback, useEffect, useState } from "react";
import Info from "./Info";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../../../hooks/useAuth";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { ACCOUNT_API, CUSTOMER_API } from "../../../../../constants/api";
import { axiosClient } from "../../../../../hooks/useHttp";
import { CODE } from "../../../../../constants/constants";

const InfoContainer = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [t] = useTranslation();
    const [account, setAccount] = useState();
    const [status, setStatus] = useState({});
    const [showNoti, setShowNoti] = useState(false);
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required(t("validate.required", { name: "Email" }))
            .email(t("validate.email", { name: "Email" })),
    });

    const { handleSubmit, control, reset, setValue, getValues } = useForm({
        defaultValues: {
            full_name: "",
            email: "",
            telephone: "",
            birthday: "",
            isCustomer: true,
        },
        resolver: yupResolver(validationSchema),
    });

    const getAccount = useCallback(() => {
        axiosClient
            .post(CUSTOMER_API.SHOW, {
                params: {
                    id: user?.id,
                },
            })
            .then((response) => {
                setAccount(response.data.account);
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
    }, [user]);

    const handleUpdate = useCallback((value) => {
        setLoading(true);
        axiosClient
            .put(ACCOUNT_API.UPDATE, {
                ...value,
            })
            .then((response) => {
                setShowNoti(true);
                setLoading(false);
                if (response.data.code === CODE.HTTP_OK) {
                    setStatus({
                        type: "success",
                        message: response.data.message,
                    });
                    getAccount();
                }
                if (response.data.code === CODE.HTTP_NOT_FOUND) {
                    setStatus({
                        type: "error",
                        message: response.data.message,
                    });
                }

            })
            .catch(({ response }) => {
                setShowNoti(true);
                setLoading(false);
                if (response.data.code === CODE.UNPROCESSABLE_ENTITY) {
                    // Object.keys(response.data.errors).forEach((element) => {
                    //     setError(element, {
                    //         type: "custom",
                    //         message: Object.values(
                    //             response.data.errors[element]
                    //         ),
                    //     });
                    // });
                }
                setStatus({ type: "error", message: response.data.message });

            });
    }, []);

    useEffect(() => {
        getAccount();
    }, [user]);

    useEffect(() => {
        if (account) {
            setValue("id", account ? account.id : "");
            setValue(
                "full_name",
                account && account.info && account.info.full_name
                    ? account.info.full_name
                    : ""
            );
            setValue(
                "email",
                account && account.info && account.info.email
                    ? account.info.email
                    : ""
            );
            setValue(
                "telephone",
                account && account.info && account.info.telephone
                    ? account.info.telephone
                    : ""
            );
            setValue(
                "birthday",
                account && account.info && account.info.birthday
                    ? account.info.birthday
                    : ""
            );
        }
    }, [account]);
    return (
        <Info
            control={control}
            setValue={setValue}
            user={user}
            handleSubmit={handleSubmit}
            loading={loading}
            account={account}
            handleUpdate={handleUpdate}
            status={status}
            showNoti={showNoti}
            setShowNoti={setShowNoti}
        />
    );
};

export default InfoContainer;
