import React, { useState } from "react";
import Order from "./Order";
import { useCallback } from "react";
import { ADMIN_ORDER_API, CUSTOMER_API } from "../../../../../constants/api";
import { CODE } from "../../../../../constants/constants";
import { useEffect } from "react";
import { axiosClient } from "../../../../../hooks/useHttp";

const OrderContainer = () => {

    const [orderList, setOrderList] = useState([]);
    const [open, setOpen] = useState(true);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState('product_code');
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [status, setStatus] = useState({});
    const [showNoti, setShowNoti] = useState(false);
    const [searchField, setSearchFiled] = useState({});
    const [totalRecord, setTotalRecord] = useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getOrderList = useCallback(() => {
        const paramater = {
            searchField: searchField,
            pageSize: rowsPerPage,
            currentPage: page,
            currentSort: orderBy,
            currentDirection: order,
        };

        axiosClient
            .get(CUSTOMER_API.GET_ORDER, {
                params: {
                    ...paramater,
                },
            })
            .then((response) => {
                if (response.data.code === CODE.HTTP_OK) {
                    setOrderList(response.data.orders);
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
        getOrderList();
    }, [order, orderBy, page, rowsPerPage, searchField]);

    return (
        <Order
            open={open}
            setOpen={setOpen}
            order={order}
            orderBy={orderBy}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            orderList={orderList}
            showNoti={showNoti}
            status={status}
            setShowNoti={setShowNoti}
            setSearchFiled={setSearchFiled}
            totalRecord={totalRecord}
        />
    );
};

export default OrderContainer;
