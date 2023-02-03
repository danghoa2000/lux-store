import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_API, API_BASE_URL, MANUFACTURER_API } from '../../../../constants/api';
import { axiosClient } from '../../../../hooks/useHttp';
import Manufacturer from './Manufacturer';
import TableHeader from './TableHeader';
import { CODE } from '../../../../constants/constants';

const ManufacturerContainer = () => {

    const [manufacturerList, setManufacturerList] = useState([]);
    const [open, setOpen] = React.useState(true);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('manufacturer_code');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [status, setStatus] = useState({});
    const [showNoti, setShowNoti] = useState(false);
    const [searchField, setSearchFiled] = useState({});
    const [totalRecord, setTotalRecord] = useState(0);

    const navigate = useNavigate();
    const headCells = { ...TableHeader }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
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
        navigate('/admin/manufacturer/create');
    }, [])
    const getManufacturerList = useCallback(() => {

        const paramater = {
            searchField: searchField,
            pageSize: rowsPerPage,
            currentPage: page,
            currentSort: orderBy,
            currentDirection: order,
        };

        axiosClient.get(MANUFACTURER_API.LIST, {
            params: {
                ...paramater
            }
        }).then((response) => {
            if (response.data.code === CODE.HTTP_OK) {
                setManufacturerList(response.data.manufacturers);
                setTotalRecord(response.data.total);
            }
        }).catch((response) => {
            setStatus({ type: 'error', message: response.data ? response.data.message : 'Server error' });
            setShowNoti(true)
        });
    }, [order, orderBy, page, rowsPerPage, searchField]);

    useEffect(() => {
        getManufacturerList()
    }, [order, orderBy, page, rowsPerPage, searchField])

    const deleteManufacturer = useCallback((id) => {
        axiosClient.delete(MANUFACTURER_API.DELETE + '/' + id)
            .then((response) => {
                if (response.data.code === CODE.HTTP_OK) {
                    setStatus({ type: 'success', message: response.data.message });
                    setShowNoti(true)
                    getManufacturerList()
                }
                if (response.data.code === CODE.HTTP_NOT_FOUND) {
                    setShowNoti(true)
                    setStatus({ type: 'error', message: response.data.message });
                };
            }).catch(({ response }) => {
                if (response.data.code === CODE.UNPROCESSABLE_ENTITY) {
                    // Object.keys(response.data.errors).forEach(element => {
                    //     setError(element, { type: 'custom', message: Object.values(response.data.errors[element]) })
                    // });
                }
                setStatus({ type: 'error', message: response.data ? response.data.message : 'Server error' });
                setShowNoti(true)
            });
    }, []);

    return <Manufacturer
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
        manufacturerList={manufacturerList}
        showNoti={showNoti}
        status={status}
        setShowNoti={setShowNoti}
        setSearchFiled={setSearchFiled}
        totalRecord={totalRecord}
        deleteManufacturer={deleteManufacturer}
    />
};

export default ManufacturerContainer;