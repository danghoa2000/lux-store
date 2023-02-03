import React, { useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    Grid,
    IconButton,
    MenuItem,
    Rating,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { API_BASE_URL, PRODUCT_API } from "../../../constants/api";
import { Reply, Star } from "@mui/icons-material";
import { axiosClient } from "../../../hooks/useHttp";
import { CODE } from "../../../constants/constants";
const ReviewModal = ({
    product,
    setStatus,
    setShowNoti,
    setOpen,
    getOrder,
}) => {
    const labels = {
        1: "Useless",
        2: "Poor",
        3: "Ok",
        4: "Good",
        5: "Excellent",
    };

    const [rate, setRate] = useState(5);
    const [hover, setHover] = useState(-1);
    const [loading, setLoading] = useState(false);

    function getLabelText(value) {
        return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
    }

    const { handleSubmit, control, reset, setValue, getValues } = useForm({
        defaultValues: {
            id: product?.product_id,
            rate: rate,
            content: "",
        },
    });

    const handleUpdate = (data) => {
        setLoading(true);
        axiosClient
            .post(PRODUCT_API.REVIEW, {
                ...data,
            })
            .then((response) => {
                setLoading(false);
                setOpen(false);
                if (response.data.code === CODE.HTTP_OK) {
                    setStatus({
                        type: "success",
                        message: response.data.message,
                    });
                    getOrder();
                } else {
                    setStatus({
                        type: "warning",
                        message: response.data.message || "error!",
                    });
                }
                setShowNoti(true);
            })
            .catch((response) => {
                setShowNoti(true);
                setStatus({
                    type: "error",
                    message: response.data
                        ? response.data.message
                        : "Server error",
                });
                setLoading(false);
            });
    };
    return (
        <div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ marginRight: 10 }} className="dark__mode">
                    <IconButton aria-label="back">
                        <Reply />
                    </IconButton>
                </div>

                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    color="#fff"
                >
                    Product review
                </Typography>
            </div>

            <div className="box_product__review">
                <div className="product__review__avatar">
                    <img src={API_BASE_URL + product?.product?.image} alt="" />
                </div>
                <Typography variant="h6" className="text-white">
                    {product?.product?.name}
                </Typography>
            </div>

            <Grid
                container
                sx={{ margin: 0, padding: 1, width: "100%" }}
                spacing={10}
            >
                <Grid item xs={12} className="box_product__review">
                    <Box
                        sx={{
                            width: 200,
                            display: "flex",
                            alignItems: "center",
                        }}
                        className="dark__mode product__review__rate"
                    >
                        <Controller
                            name="rate"
                            control={control}
                            render={({ field }) => (
                                <FormControl variant="standard">
                                    <Rating
                                        {...field}
                                        value={rate}
                                        getLabelText={getLabelText}
                                        onChange={(event, newValue) => {
                                            setRate(newValue);
                                            setValue(
                                                event.target.name,
                                                newValue
                                            );
                                        }}
                                        onChangeActive={(event, newHover) => {
                                            setHover(newHover);
                                        }}
                                        emptyIcon={
                                            <Star
                                                style={{ opacity: 0.55 }}
                                                fontSize="inherit"
                                            />
                                        }
                                    />
                                    {rate !== null && (
                                        <Box sx={{ ml: 2 }}>
                                            {
                                                labels[
                                                    hover !== -1 ? hover : rate
                                                ]
                                            }
                                        </Box>
                                    )}
                                </FormControl>
                            )}
                        />
                    </Box>
                </Grid>

                <Grid
                    item
                    xs={12}
                    className="box_product__review"
                    style={{ padding: "10px 20px" }}
                >
                    <Controller
                        name="content"
                        control={control}
                        render={({ field }) => (
                            <FormControl variant="standard">
                                <TextField
                                    className="text-white"
                                    {...field}
                                    placeholder="Enter your comment"
                                    onBlur={(event) => {
                                        setValue(
                                            event.target.name,
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

                <Button
                    variant="contained"
                    style={{
                        textTransform: "none",
                        maxWidth: "100%",
                        marginLeft: 20,
                    }}
                    onClick={handleSubmit(handleUpdate)}
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
            </Grid>
        </div>
    );
};

export default ReviewModal;
