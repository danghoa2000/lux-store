import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback } from "react";
import { axiosClient } from "../../../hooks/useHttp";
import { CUSTOMER_ADDRESS_API, PRODUCT_API } from "../../../constants/api";
import { CODE } from "../../../constants/constants";
import { Controller, useForm } from "react-hook-form";
import {
    Button,
    CircularProgress,
    FormControl,
    Grid,
    Input,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { AddHomeWork, BorderColor, Call } from "@mui/icons-material";

const ModalCreateAddress = ({
    loading,
    setLoading,
    showNoti,
    status,
    setStatus,
    setShowNoti,
    province,
    district,
    commune,
    setProvinceSelected,
    setDistrictSelected,
    setCommuneSelected,
    provinceSelected,
    districtSelected,
    communeSelected,
    setType,
    getAddress
}) => {
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
            province_id: provinceSelected,
            district_id: districtSelected,
            commune_id: communeSelected,
            fullName: "",
            telephone: "",
            address: "",
        },
        // resolver: yupResolver(validationSchema),
    });

    const onFinish = (value) => {
        setLoading(true);
        axiosClient
            .post(CUSTOMER_ADDRESS_API.CREATE, {
                ...value,
            })
            .then((response) => {
                if (response.data.code === CODE.HTTP_OK) {
                    setShowNoti(true);
                    setLoading(false);
                    setStatus({
                        type: "success",
                        message: response.data.message,
                    });
                    reset();
                    getAddress();
                }
            })
            .catch(({ response }) => {
                setShowNoti(true);
                setLoading(false);
                console.log(response);

                if (response.data.code === CODE.UNPROCESSABLE_ENTITY) {
                    Object.keys(response.data.errors).forEach((element) => {
                        setError(element, {
                            type: "custom",
                            message: Object.values(
                                response.data.errors[element]
                            ),
                        });
                    });
                } else if (response.data.code === CODE.HTTP_FOUND) {
                    setStatus({
                        type: "warning",
                        message: response.data.message,
                    });
                } else {
                    setStatus({
                        type: "error",
                        message: response.data
                            ? response.data.message
                            : "Server error",
                    });
                }
            });
    };

    return (
        <div className="my__address">
            <div className="header">
                <Typography variant="h6">New address</Typography>
            </div>
            <form onSubmit={handleSubmit(onFinish)}>
                <Grid
                    container
                    sx={{ margin: 0, padding: 1, width: "100%" }}
                    spacing={10}
                >
                    <Grid item xs={6}>
                        <Controller
                            name="fullName"
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
                        {/* {errors.full_name && <p className='text-danger'>{errors.full_name.message}</p>} */}
                    </Grid>

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

                    <Grid item xs={4}>
                        <Controller
                            name="province_id"
                            control={control}
                            render={({ field }) => (
                                <FormControl variant="standard">
                                    <Select
                                        className="ligth__mode"
                                        {...field}
                                        onChange={(event) => {
                                            setValue(
                                                event.target.name,
                                                event.target.value
                                            );
                                            setProvinceSelected(
                                                event.target.value
                                            );
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
                                        className="ligth__mode"
                                        {...field}
                                        onChange={(event) => {
                                            setValue(
                                                event.target.name,
                                                event.target.value
                                            );
                                            setDistrictSelected(
                                                event.target.value
                                            );
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
                                        className="ligth__mode"
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
                        className="m-1"
                        color="secondary"
                        onClick={() => {
                            reset();
                            setType(1)
                            setProvinceSelected(-1)
                            setDistrictSelected(-1)
                            setCommuneSelected(-1)
                        }}
                    >
                        Back
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ModalCreateAddress;
