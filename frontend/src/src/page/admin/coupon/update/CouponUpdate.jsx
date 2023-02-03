import {
    AccountCircle,
    AddHomeWork,
    BorderColor,
    Call,
} from "@mui/icons-material";
import {
    Breadcrumbs,
    Button,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Input,
    InputAdornment,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ShowSnackbars from "../../../../../components/partial/ShowSnackbars";

const CouponUpdate = (props) => {
    const {
        redirectBack,
        handleUpdate,
        handleSubmit,
        control,
        reset,
        setValue,
        getValues,
        errors,
        loading,
        showNoti,
        status,
        setShowNoti,
    } = props;

    const [t] = useTranslation();
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <Typography variant="h4" gutterBottom>
                    Coupon
                </Typography>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <Link to="/admin">Home</Link>
                    <Link to="/admin/categories">Coupon</Link>
                    <Typography>Update</Typography>
                </Breadcrumbs>
            </div>
            <div style={{ marginBottom: 10 }}>
                <Button variant="contained" onClick={() => redirectBack()}>
                    Back
                </Button>
            </div>
            <form onSubmit={handleSubmit(handleUpdate)}>
                <div className="card__admin">
                    <Grid
                        container
                        sx={{ margin: 0, padding: 1, width: "100%" }}
                        spacing={10}
                    >
                        <Grid item xs={6}>
                            <Controller
                                name="coupon_code"
                                control={control}
                                render={({ field }) => (
                                    <FormControl variant="standard">
                                        <InputLabel htmlFor="">
                                            {t(
                                                "coupon.list.table.coupon_code"
                                            )}
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
                                                name: t(
                                                    "coupon.list.table.coupon_code"
                                                ),
                                            })}
                                            onBlur={(event) => {
                                                setValue(
                                                    event.target.id,
                                                    event.target.value
                                                        ? event.target.value.trim()
                                                        : ""
                                                );
                                            }}
                                        />
                                    </FormControl>
                                )}
                            />
                            {errors.coupon_code && (
                                <p className="text-danger">
                                    {errors.coupon_code.message}
                                </p>
                            )}
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="date_start"
                                control={control}
                                render={({ field }) => (
                                    <FormControl variant="standard">
                                        <InputLabel htmlFor="date_start">
                                            {t(
                                                "coupon.list.table.date_start"
                                            )}
                                        </InputLabel>
                                        <Input
                                            id="date_start"
                                            {...field}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <BorderColor />
                                                </InputAdornment>
                                            }
                                            placeholder={t("placehoder", {
                                                name: t(
                                                    "coupon.list.table.date_start"
                                                ),
                                            })}
                                            onBlur={(event) => {
                                                setValue(
                                                    event.target.id,
                                                    event.target.value
                                                        ? event.target.value.trim()
                                                        : ""
                                                );
                                            }}
                                            type="date"
                                        />
                                    </FormControl>
                                )}
                            />
                            {errors.date_start && (
                                <p className="text-danger">
                                    {errors.date_start.message}
                                </p>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="date_finish"
                                control={control}
                                render={({ field }) => (
                                    <FormControl variant="standard">
                                        <InputLabel htmlFor="date_finish">
                                            {t(
                                                "coupon.list.table.date_finish"
                                            )}
                                        </InputLabel>
                                        <Input
                                            id="date_finish"
                                            {...field}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <BorderColor />
                                                </InputAdornment>
                                            }
                                            placeholder={t("placehoder", {
                                                name: t(
                                                    "coupon.list.table.date_finish"
                                                ),
                                            })}
                                            onBlur={(event) => {
                                                setValue(
                                                    event.target.id,
                                                    event.target.value
                                                        ? event.target.value.trim()
                                                        : ""
                                                );
                                            }}
                                            type="date"
                                        />
                                    </FormControl>
                                )}
                            />
                            {errors.date_finish && (
                                <p className="text-danger">
                                    {errors.date_finish.message}
                                </p>
                            )}
                        </Grid>

                        <Grid item xs={6}>
                            <Controller
                                name="value"
                                control={control}
                                render={({ field }) => (
                                    <FormControl variant="standard">
                                        <TextField
                                            {...field}
                                            label={t(
                                                "coupon.list.table.price_discount"
                                            )}
                                            type={"number"}
                                            variant="standard"
                                        />
                                    </FormControl>
                                )}
                            />
                            {errors.value && (
                                <p className="text-danger">
                                    {errors.value.message}
                                </p>
                            )}
                        </Grid>

                        <Grid item xs={6}>
                            <Controller
                                name="qty"
                                control={control}
                                render={({ field }) => (
                                    <FormControl variant="standard">
                                        <TextField
                                            {...field}
                                            label={t("coupon.list.table.qty")}
                                            type={"number"}
                                            variant="standard"
                                        />
                                    </FormControl>
                                )}
                            />
                            {errors.qty && (
                                <p className="text-danger">
                                    {errors.qty.message}
                                </p>
                            )}
                        </Grid>

                    </Grid>
                </div>

                <div className="card__admin">
                    <Typography
                        variant="h5"
                        className="cart_admin_title"
                        gutterBottom
                    >
                        Setting
                    </Typography>

                    <Grid
                        container
                        sx={{ margin: 0, padding: 1, width: "100%" }}
                        spacing={10}
                    >
                        <Grid item xs={6}>
                            <div className="d-inline">
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl>
                                            <FormLabel id="status">
                                                Status
                                                <span className="required"></span>
                                            </FormLabel>
                                            <RadioGroup
                                                defaultValue="1"
                                                {...field}
                                                checked={"1"}
                                            >
                                                <FormControlLabel
                                                    value="1"
                                                    control={<Radio />}
                                                    label="Active"
                                                />
                                                <FormControlLabel
                                                    value="0"
                                                    control={<Radio />}
                                                    label="Block"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    )}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className="d-flex justify-content-center w-100">
                    <Button
                        variant="contained"
                        type="submit"
                        className="m-1"
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
                        Update
                    </Button>
                    <Button
                        variant="contained"
                        type="reset"
                        className="m-1 btn-cancel"
                        onClick={() => reset()}
                    >
                        Clear
                    </Button>
                </div>
            </form>
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

export default CouponUpdate;
