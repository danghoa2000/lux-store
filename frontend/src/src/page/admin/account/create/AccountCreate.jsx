import {
    AccountCircle,
    AddHomeWork,
    BorderColor,
    CalendarMonth,
    Call,
    Email,
    PermContactCalendar,
} from "@mui/icons-material";
import {
    Box,
    Breadcrumbs,
    Button,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    Input,
    InputAdornment,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Tab,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import Direction from "../../../../../components/partial/Direction";
import ShowSnackbars from "../../../../../components/partial/ShowSnackbars";

const AccountCreate = (props) => {
    const {
        redirectBack,
        handleCreate,
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
        province,
        district,
        commune,
        setProvinceSelected,
        setDistrictSelected,
        setCommuneSelected,
    } = props;

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <Typography variant="h4" gutterBottom>
                    Account
                </Typography>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <Link to="/admin">Home</Link>
                    <Link to="/admin/account">Account</Link>
                    <Typography>Create</Typography>
                </Breadcrumbs>
            </div>
            <div style={{ marginBottom: 10 }}>
                <Button variant="contained" onClick={() => redirectBack()}>
                    Back
                </Button>
            </div>
            <form onSubmit={handleSubmit(handleCreate)}>
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
                        <Grid item xs={6}>
                            <Controller
                                name="user_code"
                                control={control}
                                render={({ field }) => (
                                    <FormControl variant="standard">
                                        <InputLabel htmlFor="userCode">
                                            User code{" "}
                                            <span className="required"></span>
                                        </InputLabel>
                                        <Input
                                            {...field}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <AccountCircle />
                                                </InputAdornment>
                                            }
                                            placeholder="Enter your User Code"
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
                            {errors.user_code && (
                                <p className="text-danger">
                                    {errors.user_code.message}
                                </p>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="full_name"
                                control={control}
                                render={({ field }) => (
                                    <FormControl variant="standard">
                                        <InputLabel htmlFor="fullName">
                                            Full name{" "}
                                            <span className="required"></span>
                                        </InputLabel>
                                        <Input
                                            id="fullName"
                                            {...field}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <BorderColor />
                                                </InputAdornment>
                                            }
                                            placeholder="Enter your Full Name"
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
                            {errors.full_name && (
                                <p className="text-danger">
                                    {errors.full_name.message}
                                </p>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <FormControl variant="standard">
                                        <InputLabel htmlFor="email">
                                            Email{" "}
                                            <span className="required"></span>
                                        </InputLabel>
                                        <Input
                                            id="email"
                                            {...field}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <Email />
                                                </InputAdornment>
                                            }
                                            placeholder="Enter your Email address"
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
                            {errors.email && (
                                <p className="text-danger">
                                    {errors.email.message}
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
                        Contact infomation
                    </Typography>

                    <Grid
                        container
                        sx={{ margin: 0, padding: 1, width: "100%" }}
                        spacing={10}
                    >
                        <Grid item xs={6}>
                            <Controller
                                name="telephone"
                                control={control}
                                render={({ field }) => (
                                    <FormControl variant="standard">
                                        <InputLabel htmlFor="telephone">
                                            Telephone
                                        </InputLabel>
                                        <Input
                                            id="telephone"
                                            {...field}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <Call />
                                                </InputAdornment>
                                            }
                                            placeholder="xxx-xxx-xxxx"
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
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="birthday"
                                control={control}
                                render={({ field }) => (
                                    <FormControl variant="standard">
                                        <InputLabel htmlFor="birthday">
                                            Birthday
                                        </InputLabel>
                                        <Input
                                            id="birthday"
                                            {...field}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <CalendarMonth />
                                                </InputAdornment>
                                            }
                                            placeholder="Enter your Birthday"
                                            type="date"
                                        />
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Controller
                                name="province_id"
                                control={control}
                                render={({ field }) => (
                                    <FormControl variant="standard">
                                        <Select
                                            {...field}
                                            onChange={(event) => {
                                                setValue(
                                                    event.target.name,
                                                    event.target.value
                                                );
                                                setProvinceSelected(
                                                    event.target.value
                                                );
                                                setDistrictSelected(-1);
                                                setValue("district_id", -1);
                                                setCommuneSelected(-1);
                                                setValue("commune_id", -1);
                                            }}
                                            label={"province"}
                                            size="small"
                                        >
                                            <MenuItem value={-1}>
                                                {"select province"}
                                            </MenuItem>
                                            {province.length > 0 &&
                                                province.map((item) => (
                                                    <MenuItem
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.name}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Controller
                                name={"district_id"}
                                control={control}
                                render={({ field }) => (
                                    <FormControl variant="standard">
                                        <Select
                                            {...field}
                                            onChange={(event) => {
                                                setValue(
                                                    event.target.name,
                                                    event.target.value
                                                );
                                                setDistrictSelected(
                                                    event.target.value
                                                );
                                                setCommuneSelected(-1);
                                                setValue("commune_id", -1);
                                            }}
                                            label={"district_id"}
                                            size="small"
                                        >
                                            <MenuItem value={-1}>
                                                {"select district"}
                                            </MenuItem>
                                            {district.length > 0 &&
                                                district.map((item) => (
                                                    <MenuItem
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.name}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Controller
                                name={"commune_id"}
                                control={control}
                                className="ligth__mode"
                                render={({ field }) => (
                                    <FormControl variant="standard">
                                        <Select
                                            onChange={(event) => {
                                                setValue(
                                                    event.target.name,
                                                    event.target.value
                                                );
                                                setCommuneSelected(
                                                    event.target.value
                                                );
                                            }}
                                            {...field}
                                            label={"commune_id"}
                                            size="small"
                                        >
                                            <MenuItem value={-1}>
                                                {"select commune"}
                                            </MenuItem>
                                            {commune.length > 0 &&
                                                commune.map((item) => (
                                                    <MenuItem
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.name}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="address"
                                control={control}
                                render={({ field }) => (
                                    <FormControl variant="standard">
                                        <TextField
                                            className="text-white"
                                            id="address"
                                            {...field}
                                            placeholder="Enter your address"
                                            onBlur={(event) => {
                                                setValue(
                                                    event.target.id,
                                                    event.target.value
                                                        ? event.target.value.trim()
                                                        : ""
                                                );
                                            }}
                                            multiline
                                            rows={4}
                                        />
                                    </FormControl>
                                )}
                            />
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
                                    name="role"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl variant="standard">
                                            <FormLabel id="role">
                                                Role
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
                                                    label="Manage"
                                                />
                                                <FormControlLabel
                                                    value="0"
                                                    control={<Radio />}
                                                    label="Employee"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    )}
                                />
                            </div>
                        </Grid>
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
                        Create
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

export default AccountCreate;
