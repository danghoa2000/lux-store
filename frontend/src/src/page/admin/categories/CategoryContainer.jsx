import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES_API, GROUP_CATEGORY_API } from '../../../../constants/api';
import { axiosClient } from '../../../../hooks/useHttp';
import Category from './Category';
import TableHeader from './TableHeader';
import { CODE } from '../../../../constants/constants';

const CategoryContainer = () => {

    const [categoryList, setCategoryList] = useState([]);
    const [open, setOpen] = React.useState(true);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('category_code');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [status, setStatus] = useState({});
    const [showNoti, setShowNoti] = useState(false);
    const [searchField, setSearchFiled] = useState({});
    const [totalRecord, setTotalRecord] = useState(0);
    const [groupCategoryList, setGroupCategoryList] = useState([]);

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

    const redirectCategoryCreate = useCallback(() => {
        navigate('/admin/categories/create');
    }, [])
    const getCategoryList = useCallback(() => {

        const paramater = {
            searchField: searchField,
            pageSize: rowsPerPage,
            currentPage: page,
            currentSort: orderBy,
            currentDirection: order,
        };

        axiosClient.get(CATEGORIES_API.LIST, {
            params: {
                ...paramater
            }
        }).then((response) => {
            if (response.data.code === CODE.HTTP_OK) {
                setCategoryList(response.data.categories);
                setTotalRecord(response.data.total);
            }
        }).catch((response) => {
            setStatus({ type: 'error', message: response.data ? response.data.message : 'Server error' });
            setShowNoti(true)
        });
    }, [order, orderBy, page, rowsPerPage, searchField]);

    useEffect(() => {
        getCategoryList()
    }, [order, orderBy, page, rowsPerPage, searchField])

    const deleteCategory = useCallback((id) => {
        axiosClient.delete(CATEGORIES_API.DELETE + '/' + id)
            .then((response) => {
                if (response.data.code === CODE.HTTP_OK) {
                    setStatus({ type: 'success', message: response.data.message });
                    setShowNoti(true)
                    getCategoryList()
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

    const getGroupCategory = useCallback(() => {
        axiosClient.get(GROUP_CATEGORY_API.LIST)
            .then((response) => {
                if (response.data.code === CODE.HTTP_OK) {
                    setGroupCategoryList(response.data.groupCategories);
                }
            }).catch((response) => {
                setStatus({ type: 'error', message: response.data ? response.data.message : 'Server error' });
                setShowNoti(true)
            });
    }, [])

    useEffect(() => {
        getGroupCategory();
    }, [])

    return <Category
        open={open}
        setOpen={setOpen}
        order={order}
        orderBy={orderBy}
        page={page}
        rowsPerPage={rowsPerPage}
        handleRequestSort={handleRequestSort}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        redirectCategoryCreate={redirectCategoryCreate}
        headCells={headCells}
        categoryList={categoryList}
        showNoti={showNoti}
        status={status}
        setShowNoti={setShowNoti}
        setSearchFiled={setSearchFiled}
        totalRecord={totalRecord}
        deleteCategory={deleteCategory}
        groupCategoryList={groupCategoryList}
    />
};

export default CategoryContainer;