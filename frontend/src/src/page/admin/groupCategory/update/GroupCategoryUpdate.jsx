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
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ShowSnackbars from "../../../../../components/partial/ShowSnackbars";
import ProductAvatar from "../../product/create/ProductAvatar";

const GroupCategoryUpdate = (props) => {
    const {
        redirectBack,
        handleUpdate,
        toggleDirection,
        setToggleDirection,
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
        avatarRef,
        groupCategory,
    } = props;

    const [t] = useTranslation();
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <Typography variant="h4" gutterBottom>
                    Group category
                </Typography>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <Link to="/admin">Home</Link>
                    <Link to="/admin/manufacturer">Group category</Link>
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
                    <Typography
                        variant="h5"
                        className="cart_admin_title"
                        gutterBottom
                    >
                        Basic information
                    </Typography>
                    <Grid
                        container
                        sx={{ margin: 0, padding: 1, width: "100%" }}
                        spacing={10}
                    >
                        <Grid item xs={12}>
                            <Typography
                                variant="h6"
                                className="cart_admin_title"
                                gutterBottom
                            >
                                {t("product.list.table.avatar")}
                            </Typography>
                            <ProductAvatar
                                control={control}
                                setValue={setValue}
                                getValues={getValues}
                                errors={errors}
                                avatarRef={avatarRef}
                                product={groupCategory}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="group_category_code"
                                control={control}
                                render={({ field }) => (
                                    <FormControl variant="standard">
                                        <InputLabel htmlFor="userCode">
                                            Group category code{" "}
                                            <span className="required"></span>
                                        </InputLabel>
                                        <Input
                                            {...field}
                                            disabled
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <AccountCircle />
                                                </InputAdornment>
                                            }
                                            placeholder={t("placehoder", {
                                                name: t(
                                                    "group_category.list.table.group_category_code"
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
                            {errors.group_category_code && (
                                <p className="text-danger">
                                    {errors.group_category_code.message}
                                </p>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <FormControl variant="standard">
                                        <InputLabel htmlFor="fullName">
                                            Name
                                        </InputLabel>
                                        <Input
                                            id="fullName"
                                            {...field}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <BorderColor />
                                                </InputAdornment>
                                            }
                                            placeholder={t("placehoder", {
                                                name: t(
                                                    "group_category.list.table.name"
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
                            {errors.name && (
                                <p className="text-danger">
                                    {errors.name.message}
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

export default GroupCategoryUpdate;
