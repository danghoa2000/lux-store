import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES_API, GROUP_CATEGORY_API, MANUFACTURER_API, PRODUCT_API } from '../../../../constants/api';
import { axiosClient } from '../../../../hooks/useHttp';
import Product from './Product';
import TableHeader from './TableHeader';
import { CODE } from '../../../../constants/constants';

const ProductContainer = () => {

    const [productList, setProductList] = useState([]);
    const [open, setOpen] = React.useState(true);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('product_code');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [status, setStatus] = useState({});
    const [showNoti, setShowNoti] = useState(false);
    const [searchField, setSearchFiled] = useState({});
    const [totalRecord, setTotalRecord] = useState(0);
    const [groupCategoryList, setGroupCategoryList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [manufacturerList, setManufacturerList] = useState([]);

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

    const redirectProductCreate = useCallback(() => {
        navigate('/admin/product/create');
    }, [])
    const getProductList = useCallback(() => {

        const paramater = {
            searchField: searchField,
            pageSize: rowsPerPage,
            currentPage: page,
            currentSort: orderBy,
            currentDirection: order,
        };

        axiosClient.get(PRODUCT_API.LIST, {
            params: {
                ...paramater
            }
        }).then((response) => {
            if (response.data.code === CODE.HTTP_OK) {
                setProductList(response.data.products);
                setTotalRecord(response.data.total);
            }
        }).catch((response) => {
            setStatus({ type: 'error', message: response.data ? response.data.message : 'Server error' });
            setShowNoti(true)
        });
    }, [order, orderBy, page, rowsPerPage, searchField]);

    const getGroupCategoryList = useCallback(() => {

        axiosClient.get(GROUP_CATEGORY_API.LIST).then((response) => {
            if (response.data.code === CODE.HTTP_OK) {
                setGroupCategoryList(response.data.groupCategories);
            }
        }).catch((response) => {
            setStatus({ type: 'error', message: response.data ? response.data.message : 'Server error' });
            setShowNoti(true)
        });
    }, []);

    const getManufacturerList = useCallback(() => {
        axiosClient.get(MANUFACTURER_API.LIST).then((response) => {
            if (response.data.code === CODE.HTTP_OK) {
                setManufacturerList(response.data.manufacturers);
            }
        }).catch((response) => {
            setStatus({ type: 'error', message: response.data ? response.data.message : 'Server error' });
            setShowNoti(true)
        });
    }, []);

    const getCategoryList = useCallback(() => {
        axiosClient.get(CATEGORIES_API.LIST).then((response) => {
            if (response.data.code === CODE.HTTP_OK) {
                setCategoryList(response.data.categories);
            }
        }).catch((response) => {
            setStatus({ type: 'error', message: response.data ? response.data.message : 'Server error' });
            setShowNoti(true)
        });
    }, []);

    useEffect(() => {
        getManufacturerList();
        getGroupCategoryList();
        getCategoryList();
    }, [getManufacturerList, getGroupCategoryList, getCategoryList])

    useEffect(() => {
        getProductList();
    }, [order, orderBy, page, rowsPerPage, searchField])

    const deleteProduct = useCallback((id) => {
        axiosClient.delete(PRODUCT_API.DELETE + '/' + id)
            .then((response) => {
                if (response.data.code === CODE.HTTP_OK) {
                    setStatus({ type: 'success', message: response.data.message });
                    setShowNoti(true)
                    getProductList()
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

    return <Product
        open={open}
        setOpen={setOpen}
        order={order}
        orderBy={orderBy}
        page={page}
        rowsPerPage={rowsPerPage}
        handleRequestSort={handleRequestSort}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        redirectProductCreate={redirectProductCreate}
        headCells={headCells}
        productList={productList}
        showNoti={showNoti}
        status={status}
        setStatus={setStatus}
        setShowNoti={setShowNoti}
        setPage={setPage}
        setSearchFiled={setSearchFiled}
        totalRecord={totalRecord}
        deleteProduct={deleteProduct}
        groupCategoryList={groupCategoryList}
        categoryList={categoryList}
        manufacturerList={manufacturerList}
    />
};

export default ProductContainer;