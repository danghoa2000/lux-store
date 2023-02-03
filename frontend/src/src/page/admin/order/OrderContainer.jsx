import React, { useCallback, useEffect, useState } from "react";
import Order from "./Order";
import { useNavigate } from "react-router-dom";
import TableHeader from "./TableHeader";
import { CODE } from "../../../../constants/constants";
import { axiosClient } from "../../../../hooks/useHttp";
import { ADMIN_ORDER_API } from "../../../../constants/api";

const OrderContainer = () => {
    const [orderList, setOrderList] = useState([]);
    const [open, setOpen] = useState(true);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("order_code");
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

    const redirectManufacturerCreate = useCallback(() => {
        navigate("/admin/manufacturer/create");
    }, []);
    const getOrderList = useCallback(() => {
        const paramater = {
            searchField: searchField,
            pageSize: rowsPerPage,
            currentPage: page,
            currentSort: orderBy,
            currentDirection: order,
        };

        axiosClient
            .get(ADMIN_ORDER_API.LIST, {
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
            rowsPerPage={rowsPerPage}
            handleRequestSort={handleRequestSort}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            redirectManufacturerCreate={redirectManufacturerCreate}
            headCells={headCells}
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
