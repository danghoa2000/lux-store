import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_API, API_BASE_URL } from '../../../../constants/api';
import { axiosClient } from '../../../../hooks/useHttp';
import Account from './Account';
import TableHeader from './TableHeader';
import { CODE } from '../../../../constants/constants';

const AccountContainer = () => {

    const [accountList, setAccountList] = useState([]);
    const [open, setOpen] = React.useState(true);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('user_code');
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

    const redirectAccountCreate = useCallback(() => {
        navigate('/admin/account/create');
    }, [])
    const getAccountList = useCallback(() => {

        const paramater = {
            searchField: searchField,
            pageSize: rowsPerPage,
            currentPage: page,
            currentSort: orderBy,
            currentDirection: order,
        };

        axiosClient.get(ACCOUNT_API.LIST, {
            params: {
                ...paramater
            }
        }).then((response) => {
            if (response.data.code === CODE.HTTP_OK) {
                setAccountList(response.data.accounts);
                setTotalRecord(response.data.total);
            }
        }).catch((response) => {
            setStatus({ type: 'error', message: response.data ? response.data.message : 'Server error' });
            setShowNoti(true)
        });
    }, [order, orderBy, page, rowsPerPage, searchField]);

    useEffect(() => {
        getAccountList()
    }, [order, orderBy, page, rowsPerPage, searchField])

    const deleteAccount = useCallback((id) => {
        axiosClient.delete(ACCOUNT_API.DELETE + '/' + id)
            .then((response) => {
                if (response.data.code === CODE.HTTP_OK) {
                    setStatus({ type: 'success', message: response.data.message });
                    setShowNoti(true)

                    getAccountList()
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
    }, [order, orderBy, page, rowsPerPage, searchField]);

    return <Account
        open={open}
        setOpen={setOpen}
        order={order}
        orderBy={orderBy}
        page={page}
        rowsPerPage={rowsPerPage}
        handleRequestSort={handleRequestSort}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        redirectAccountCreate={redirectAccountCreate}
        headCells={headCells}
        accountList={accountList}
        showNoti={showNoti}
        status={status}
        setShowNoti={setShowNoti}
        setSearchFiled={setSearchFiled}
        totalRecord={totalRecord}
        deleteAccount={deleteAccount}
    />
};

export default AccountContainer;