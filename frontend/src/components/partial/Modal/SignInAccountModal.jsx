import { AccountCircle, Lock, Note } from "@mui/icons-material";
import {
    Button,
    CircularProgress,
    FormControl,
    Grid,
    Input,
    InputAdornment,
    InputLabel,
    Typography,
} from "@mui/material";
import React from "react";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { axiosClient } from "../../../hooks/useHttp";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ACCOUNT_API, LOGIN_API } from "../../../constants/api";
import { useState } from "react";
import { CODE } from "../../../constants/constants";
import { useNavigate } from "react-router-dom";
import {
    CUSTOMER_INFO,
    SESSION_ACCESS_TOKEN,
} from "../../../utils/sessionHelper";
import { useAuth } from "../../../hooks/useAuth";

const SignInAccountModal = ({
    setShowNoti,
    setStatus,
    setOpen,
    setType,
    getCart,
}) => {
    const [t] = useTranslation();
    const { setUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [isLoginFailed, setisLoginFailed] = useState({});
    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required(t("validate.required", { name: "Email" }))
            .email(t("validate.email", { name: "Email" })),
        password: Yup.string().required("Password is required"),
    });

    const {
        handleSubmit,
        control,
        reset,
        setValue,
        getValues,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm({
        shouldUnregister: false,
        defaultValues: {
            email: "",
            password: "",
            isCustomer: true,
        },
        resolver: yupResolver(validationSchema),
    });

    const handleCreate = useCallback((value) => {
        setLoading(true);
        axiosClient
            .post(LOGIN_API.LOGIN, {
                ...value,
            })
            .then((res) => {
                setUser(res.data.info);
                window.sessionStorage.setItem(
                    SESSION_ACCESS_TOKEN,
                    res.data.access_token
                );
                window.sessionStorage.setItem(
                    CUSTOMER_INFO,
                    JSON.stringify(res.data.info)
                );
                getCart();
                setLoading(false);
                setOpen(false);
            })
            .catch((err) => {
                setLoading(false);
                setShowNoti(true);
                setisLoginFailed({
                    status: err.response.data.code,
                    message: err.response.data.message,
                });
                setStatus({
                    type: "error",
                    message: err.response.data
                        ? err.response.data.message
                        : "Server error",
                });
                if (err.response.data.code === CODE.UNPROCESSABLE_ENTITY) {
                    Object.keys(err.response.data.errors).forEach((element) => {
                        setError(element, {
                            type: "custom",
                            message: Object.values(
                                err.response.data.errors[element]
                            ),
                        });
                    });
                }
                setValue("password", "");
            });
    });

    return (
        <form onSubmit={handleSubmit(handleCreate)}>
            <Typography
                variant="h6"
                className="cart_admin_title"
                style={{ fontWeight: "bold", textAlign: "center" }}
            >
                Welcome To Elite
            </Typography>
            <Typography
                variant="h8"
                className="cart_admin_title"
                style={{ textAlign: "center", display: "block" }}
            >
                SignIn account
            </Typography>
            {isLoginFailed && (
                <span className="text-base text-danger">
                    {isLoginFailed.message}
                </span>
            )}
            <Grid
                container
                sx={{ margin: 0, padding: 1, width: "100%" }}
                spacing={10}
            >
                <Grid item xs={12}>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <FormControl variant="standard">
                                <InputLabel htmlFor="">
                                    {t("account.email")}
                                    <span className="required"></span>
                                </InputLabel>
                                <Input
                                    {...field}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    }
                                    placeholder={t("placehoder", {
                                        name: t("account.email"),
                                    })}
                                    onBlur={(event) => {
                                        setValue(
                                            event.target.name,
                                            event.target.value
                                                ? event.target.value.trim()
                                                : ""
                                        );
                                    }}
                                />
                            </FormControl>
                        )}
                    />
                    {errors.email && (
                        <p className="text-danger">{errors.email.message}</p>
                    )}
                </Grid>

                <Grid item xs={12}>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <FormControl variant="standard">
                                <InputLabel htmlFor="">
                                    {t("account.password")}
                                    <span className="required"></span>
                                </InputLabel>
                                <Input
                                    {...field}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <Lock />
                                        </InputAdornment>
                                    }
                                    placeholder={t("placehoder", {
                                        name: t("account.password"),
                                    })}
                                    onBlur={(event) => {
                                        setValue(
                                            event.target.name,
                                            event.target.value
                                                ? event.target.value.trim()
                                                : ""
                                        );
                                    }}
                                    type="password"
                                />
                            </FormControl>
                        )}
                    />
                    {errors.password && (
                        <p className="text-danger">{errors.password.message}</p>
                    )}
                </Grid>

                <Button
                    type="submit"
                    variant="contained"
                    className="btn__checkcout"
                    style={{ width: "100%" }}
                    disabled={loading}
                >
                    {loading && (
                        <CircularProgress
                            disableShrink
                            style={{
                                color: "white",
                                width: "14px",
                                height: "14px",
                                margin: "0 5px 0 0",
                            }}
                        />
                    )}
                    Login
                </Button>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                    }}
                >
                    <Typography
                        variant="h8"
                        className="cart_admin_title"
                        style={{ textAlign: "center", display: "block" }}
                    >
                        Don’t have account?
                    </Typography>

                    <span
                        onClick={() => setType(1)}
                        style={{
                            textDecoration: "underline",
                            margin: 5,
                            color: "blue",
                        }}
                    >
                        Register
                    </span>
                </div>
            </Grid>
        </form>
    );
};

export default SignInAccountModal;
