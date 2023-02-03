import axios from "axios";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import {
    FORM_SEARCH_API,
    PRODUCT_API,
    SEARCH_API,
} from "../../../../constants/api";
import { CODE } from "../../../../constants/constants";
import { axiosClient } from "../../../../hooks/useHttp";
import { useSearchField } from "../../../../hooks/useSearchField";
import Product from "./Product";

const ProductContainer = ({
    keySearch,
    setKeySearch,
    isCompleteSetting,
    setComplateSetting,
}) => {
    const [productList, setProductList] = useState([]);
    const [orderBy, setOrderBy] = useState("product_code");
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const { searchField, setSearchFiled } = useSearchField();
    const [totalRecord, setTotalRecord] = useState(0);
    const [status, setStatus] = useState({});
    const [showNoti, setShowNoti] = useState(false);
    const [formFilter, setFormFilter] = useState([]);
    const { state } = useLocation();

    const { handleSubmit, control, reset, setValue, getValues } = useForm({
        shouldUnregister: false,
        defaultValues: {
            group_category_id: "",
            category_id: [],
            attribute: [],
            rate: "",
            price_min: "",
            price_max: "",
            order: "1",
        },
    });

    const getProductList = (value) => {
        const paramater = {
            searchField: value,
            pageSize: rowsPerPage,
            currentPage: page,
            currentSort: orderBy,
            currentDirection: orderBy,
        };

        axiosClient
            .get(SEARCH_API, {
                params: {
                    ...paramater,
                },
            })
            .then((response) => {
                if (response.data.code === CODE.HTTP_OK) {
                    setProductList(response.data.products);
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
    };

    const getFormFilter = useCallback((id) => {
        axiosClient
            .get(FORM_SEARCH_API, {
                params: {
                    group_category_id: id,
                },
            })
            .then((response) => {
                if (response.data.code === CODE.HTTP_OK) {
                    setFormFilter(response.data.formFilter);
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
    }, []);

    const clear = () => {
        setValue("price_min", "");
        setValue("price_max", "");
        setValue("group_category_id", "");
        setValue("category_id", []);
        setValue("attribute", []);
        setValue("rate", "");
        setValue("price_min", "");
        setValue("order", "1");
        setKeySearch("");
    };

    useEffect(() => {
        if (state && state.group_category_id) {
            setValue("group_category_id", state.group_category_id);
        }
    }, [state]);
    useEffect(() => {
        setValue("name", keySearch);
    }, [keySearch]);

    useEffect(() => {
        getProductList(getValues());
    }, [isCompleteSetting]);

    useEffect(() => {
        getFormFilter(getValues("group_category_id"));
    }, [getValues("group_category_id")]);

    return (
        <Product
            // order={order}
            orderBy={orderBy}
            page={page}
            rowsPerPage={rowsPerPage}
            setSearchFiled={setSearchFiled}
            totalRecord={totalRecord}
            productList={productList}
            formFilter={formFilter}
            setPage={setPage}
            handleSubmit={handleSubmit}
            control={control}
            reset={reset}
            setValue={setValue}
            getValues={getValues}
            getProductList={getProductList}
            isCompleteSetting={isCompleteSetting}
            setComplateSetting={setComplateSetting}
            clear={clear}
            keySearch={keySearch}
        />
    );
};

export default ProductContainer;
