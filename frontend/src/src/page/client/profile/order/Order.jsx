import {
    Breadcrumbs,
    Grid,
    Pagination,
    Stack,
    Typography,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import OrderStatus from "../../../admin/order/detail/OrderStatus";
import { ShoppingBagOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { formatPrice } from "../../../../../utils/helper";
import { format, parseISO } from "date-fns";

const Order = ({
    open,
    setOpen,
    order,
    orderBy,
    page,
    setPage,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    orderList,
    showNoti,
    status,
    setShowNoti,
    setSearchFiled,
    totalRecord,
}) => {
    const [t] = useTranslation();
    const navigate = useNavigate();
    return (
        <div>
            <div
                className="d-flex align-items-center profile__bar__item-active"
                style={{ marginBottom: 20 }}
            >
                <ShoppingBagOutlined></ShoppingBagOutlined>
                <Typography
                    variant="h6"
                    margin={"0"}
                    style={{ fontWeight: "bold" }}
                >
                    Orders
                </Typography>
            </div>
            <div className="order__list">
                <div className="order__item" key={-1}>
                    <Grid
                        container
                        sx={{ margin: 0, padding: 1, width: "100%" }}
                        spacing={2}
                    >
                        <Grid item xs={2}>
                            <Typography variant="h8" className="font-bold">
                                Order #
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h8" className="font-bold">
                                Status
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h8" className="font-bold">
                                Date purchased
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="h8" className="font-bold">
                                Total
                            </Typography>
                        </Grid>
                    </Grid>
                </div>

                {orderList &&
                    Object.keys(orderList).length > 0 &&
                    Object.values(orderList).map((item) => (
                        <div
                            className="order__item"
                            key={item.id}
                            onClick={() =>
                                navigate("/elite/profile/order/detail", {
                                    state: {
                                        id: item.id,
                                    },
                                })
                            }
                        >
                            <Grid
                                container
                                sx={{ margin: 0, padding: 1, width: "100%" }}
                                spacing={2}
                                key={item.id}
                            >
                                <Grid item xs={2}>
                                    <Typography variant="h8">
                                        {item.id}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h8">
                                        {t(`order.status.${item.status}`)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h8">
                                        {item?.created_at
                                            ? format(
                                                  parseISO(item?.created_at),
                                                  "dd MMM, yyyy"
                                              )
                                            : ""}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h8">
                                        {formatPrice(item.price || 0)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>
                    ))}
            </div>
            <div className="d-flex mt-3 justify-content-end w-100">
                <div className="pagination">
                    <Stack spacing={2}>
                        <Pagination
                            count={Math.ceil(totalRecord / rowsPerPage)}
                            page={page}
                            onChange={(e, value) => setPage(value)}
                        />
                    </Stack>
                </div>
            </div>
        </div>
    );
};

export default Order;
