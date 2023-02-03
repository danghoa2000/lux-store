import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../../../hooks/useHttp";
import Coupon from "./Coupon";
import TableHeader from "./TableHeader";
import { CODE } from "../../../../constants/constants";
import { COUNPON_API } from "../../../../constants/api";

const CouponContainer = () => {
    const [couponList, setCouponList] = useState([]);
    const [open, setOpen] = useState(true);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("coupon_code");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [status, setStatus] = useState({});
    const [showNoti, setShowNoti] = useState(false);
    const [searchField, setSearchFiled] = useState({});
    const [totalRecord, setTotalRecord] = useState(0);

    const navigate = useNavigate();
    const headCells = { ...TableHeader };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const redirectCouponCreate = useCallback(() => {
        navigate("/admin/coupon/create");
    }, []);
    const getCouponList = useCallback(() => {
        const paramater = {
            searchField: searchField,
            pageSize: rowsPerPage,
            currentPage: page,
            currentSort: orderBy,
            currentDirection: order,
        };

        axiosClient
            .get(COUNPON_API.LIST, {
                params: {
                    ...paramater,
                },
            })
            .then((response) => {
                if (response.data.code === CODE.HTTP_OK) {
                    setCouponList(response.data.coupons);
                    setTotalRecord(response.data.total);
                }
            })
            .catch((response) => {
                setStatus({
                    type: "error",
                    message: response.data
                        ? response.data.message
                        : "Server error",
                });
                setShowNoti(true);
            });
    }, [order, orderBy, page, rowsPerPage, searchField]);

    useEffect(() => {
        getCouponList();
    }, [order, orderBy, page, rowsPerPage, searchField]);

    const deleteCoupon = useCallback((id) => {
        axiosClient
            .delete(COUNPON_API.DELETE + "/" + id)
            .then((response) => {
                if (response.data.code === CODE.HTTP_OK) {
                    setStatus({
                        type: "success",
                        message: response.data.message,
                    });
                    setShowNoti(true);
                    getCouponList();
                }
                if (response.data.code === CODE.HTTP_NOT_FOUND) {
                    setShowNoti(true);
                    setStatus({
                        type: "error",
                        message: response.data.message,
                    });
                }
            })
            .catch(({ response }) => {
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
                setStatus({
                    type: "error",
                    message: response.data
                        ? response.data.message
                        : "Server error",
                });
                setShowNoti(true);
            });
    }, []);

    return (
        <Coupon
            open={open}
            setOpen={setOpen}
            order={order}
            orderBy={orderBy}
            page={page}
            rowsPerPage={rowsPerPage}
            handleRequestSort={handleRequestSort}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            redirectCouponCreate={redirectCouponCreate}
            headCells={headCells}
            couponList={couponList}
            showNoti={showNoti}
            status={status}
            setShowNoti={setShowNoti}
            setSearchFiled={setSearchFiled}
            totalRecord={totalRecord}
            deleteCoupon={deleteCoupon}
        />
    );
};

export default CouponContainer;
