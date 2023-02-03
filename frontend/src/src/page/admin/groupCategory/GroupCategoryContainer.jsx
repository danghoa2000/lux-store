import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GROUP_CATEGORY_API } from '../../../../constants/api';
import { axiosClient } from '../../../../hooks/useHttp';
import GroupCategory from './GroupCategory';
import TableHeader from './TableHeader';
import { CODE } from '../../../../constants/constants';

const GroupCategoryContainer = () => {

    const [groupCategoryList, setGroupCategoryList] = useState([]);
    const [open, setOpen] = React.useState(true);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('group_category_code');
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

    const redirectGroupCategoryCreate = useCallback(() => {
        navigate('/admin/group-category/create');
    }, [])
    const getGroupCategoryList = useCallback(() => {

        const paramater = {
            searchField: searchField,
            pageSize: rowsPerPage,
            currentPage: page,
            currentSort: orderBy,
            currentDirection: order,
        };

        axiosClient.get(GROUP_CATEGORY_API.LIST, {
            params: {
                ...paramater
            }
        }).then((response) => {
            if (response.data.code === CODE.HTTP_OK) {
                setGroupCategoryList(response.data.groupCategories);
                setTotalRecord(response.data.total);
            }
        }).catch((response) => {
            setStatus({ type: 'error', message: response.data ? response.data.message : 'Server error' });
            setShowNoti(true)
        });
    }, [order, orderBy, page, rowsPerPage, searchField]);

    useEffect(() => {
        getGroupCategoryList()
    }, [order, orderBy, page, rowsPerPage, searchField])

    const deleteGroupCategory = useCallback((id) => {
        axiosClient.delete(GROUP_CATEGORY_API.DELETE + '/' + id)
            .then((response) => {
                if (response.data.code === CODE.HTTP_OK) {
                    setStatus({ type: 'success', message: response.data.message });
                    setShowNoti(true)
                    getGroupCategoryList()
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

    return <GroupCategory
        open={open}
        setOpen={setOpen}
        order={order}
        orderBy={orderBy}
        page={page}
        rowsPerPage={rowsPerPage}
        handleRequestSort={handleRequestSort}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        redirectGroupCategoryCreate={redirectGroupCategoryCreate}
        headCells={headCells}
        groupCategoryList={groupCategoryList}
        showNoti={showNoti}
        status={status}
        setShowNoti={setShowNoti}
        setSearchFiled={setSearchFiled}
        totalRecord={totalRecord}
        deleteGroupCategory={deleteGroupCategory}
    />
};

export default GroupCategoryContainer;