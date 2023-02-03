import React, { useState } from "react";
import {
    Avatar,
    Box,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Rating,
    Typography,
} from "@mui/material";
import { API_BASE_URL, PRODUCT_API } from "../../../constants/api";
import { Reply, Star } from "@mui/icons-material";
import { axiosClient } from "../../../hooks/useHttp";
import { CODE } from "../../../constants/constants";
import { useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { format, parseISO } from "date-fns";

const ShowReviewModal = ({ productId, setStatus, setShowNoti }) => {
    const labels = {
        1: "Useless",
        2: "Poor",
        3: "Ok",
        4: "Good",
        5: "Excellent",
    };

    const { user } = useAuth();
    const [review, setReview] = useState();
    const getReview = () => {
        axiosClient
            .post(PRODUCT_API.REVIEW_SHOW, {
                userId: user?.id,
                productId: productId,
            })
            .then((response) => {
                if (response.data.code === CODE.HTTP_OK) {
                    setReview(response.data.review);
                } else {
                    setStatus({
                        type: "warning",
                        message: response.data.message || "error!",
                    });
                    setShowNoti(true);
                }
            })
            .catch((response) => {
                setShowNoti(true);
                setStatus({
                    type: "error",
                    message: response.data
                        ? response.data.message
                        : "Server error",
                });
            });
    };

    useEffect(() => {
        getReview();
    }, []);
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
                    <img src={API_BASE_URL + review?.image} alt="" />
                </div>
                <Typography variant="h6" className="text-white">
                    {review?.name}
                </Typography>
            </div>
            <Divider
                style={{
                    borderColor: "rgb(246, 249, 252)",
                    borderBottomWidth: "thin",
                    opacity: 0.5,
                    margin: 10
                }}
            />
            <Grid
                container
                sx={{ margin: 0, padding: 1, width: "100%" }}
                spacing={10}
            >
                <Grid item xs={12} className="box_product__review">
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                        className="dark__mode product__review__rate"
                    >
                        <List sx={{ width: "100%" }}>
                            <div>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            {review?.customer_name
                                                ? review?.customer_name.split(
                                                      ""
                                                  )[0]
                                                : ""}
                                        </Avatar>
                                    </ListItemAvatar>

                                    <ListItemText
                                        primary={
                                            <span
                                                style={{
                                                    fontWeight: "bold",
                                                }}
                                                className="mx-2 text-white"
                                            >
                                                {review?.customer_name}
                                            </span>
                                        }
                                        secondary={
                                            <div className="detail__product__info">
                                                <div className="detail__product__info-rate review">
                                                    <Rating
                                                        name="simple-controlled"
                                                        className="mx-2"
                                                        value={
                                                            review?.rate || 0
                                                        }
                                                        readOnly
                                                    />
                                                    <span className="font-bold mx-2 text-white" style={{ fontSize: 14 }}>
                                                        {review?.created_at
                                                            ? format(
                                                                  parseISO(
                                                                      review?.created_at
                                                                  ),
                                                                  "dd MMM, yyyy hh:mm"
                                                              )
                                                            : ""}
                                                    </span>
                                                </div>
                                            </div>
                                        }
                                    />
                                </ListItem>
                                <ListItemText
                                    style={{ marginLeft: 16, color: "#fff" }}
                                    primary={review?.content}
                                ></ListItemText>
                            </div>
                        </List>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default ShowReviewModal;
