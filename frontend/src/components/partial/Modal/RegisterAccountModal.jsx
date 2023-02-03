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
import { ACCOUNT_API } from "../../../constants/api";
import { useState } from "react";
import { CODE } from "../../../constants/constants";

const RegisterAccountModal = ({ setShowNoti, setStatus, setOpen, setType }) => {
    const [t] = useTranslation();
    const [loading, setLoading] = useState(false);
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required(t("validate.required", { name: "Email" }))
            .email(t("validate.email", { name: "Email" })),
        full_name: Yup.string().required(
            t("validate.required", { name: "Full name" })
        ),
        password: Yup.string().required("Password is required"),
        comfirm_password: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Password comfirm must match"
        ),
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
            full_name: "",
            password: "",
            comfirm_password: "",
            isCustomer: true,
        },
        resolver: yupResolver(validationSchema),
    });

    const handleCreate = useCallback((value) => {
        setLoading(true);
        axiosClient
            .post(ACCOUNT_API.CREATE, {
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
                    setType(2);
                }
            })
            .catch(({ response }) => {
                setShowNoti(true);
                setLoading(false);
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
                Register account
            </Typography>
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
                        name="full_name"
                        control={control}
                        render={({ field }) => (
                            <FormControl variant="standard">
                                <InputLabel htmlFor="">
                                    {t("account.full_name")}
                                    <span className="required"></span>
                                </InputLabel>
                                <Input
                                    {...field}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <Note />
                                        </InputAdornment>
                                    }
                                    placeholder={t("placehoder", {
                                        name: t("account.full_name"),
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
                    {errors.full_name && (
                        <p className="text-danger">
                            {errors.full_name.message}
                        </p>
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
                <Grid item xs={12}>
                    <Controller
                        name="comfirm_password"
                        control={control}
                        render={({ field }) => (
                            <FormControl variant="standard">
                                <InputLabel htmlFor="">
                                    {t("account.comfirm_password")}
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
                                        name: t("account.comfirm_password"),
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
                    {errors.comfirm_password && (
                        <p className="text-danger">
                            {errors.comfirm_password.message}
                        </p>
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
                    Register
                </Button>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: '100%'
                    }}
                >
                    <Typography
                        variant="h8"
                        className="cart_admin_title"
                        style={{ textAlign: "center", display: "block" }}
                    >
                        Have account?
                    </Typography>

                    <span
                        onClick={() => setType(2)}
                        style={{ textDecoration: "underline", margin: 5, color: 'blue' }}
                    >
                        Back to signin
                    </span>
                </div>
            </Grid>
        </form>
    );
};

export default RegisterAccountModal;
