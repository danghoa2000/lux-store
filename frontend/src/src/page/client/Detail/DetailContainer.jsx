import { map, result } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PRODUCT_API } from '../../../../constants/api';
import { BASE_URL, CODE } from '../../../../constants/constants';
import { axiosClient } from '../../../../hooks/useHttp';
import Detail from './Detail';
import { Check } from '@mui/icons-material';

const DetailContainer = ({ CartItem, addToCart, decreaseQty, showNoti, setShowNoti, setStatus }) => {
    const [qty, setQty] = useState(1);
    const { state } = useLocation();
    const [product, setProduct] = useState();
    const [tab, setTab] = useState(0);
    const [option, setOption] = useState({});
    const [stock, setStock] = useState(0);
    const [currentOption, setCurrentOption] = useState({});
    const [totalRecord, setTotalRecord] = useState(0);
    const [totalRate, setTotalRate] = useState(0);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };
    const getProduct = useCallback(() => {
        const paramater = {
            pageSize: rowsPerPage,
            currentPage: page,
            id: state?.id 
        };
        axiosClient.get(PRODUCT_API.SHOW, {
            params: {
                ...paramater
            }
        }).then((response) => {
            if (response.data.code === CODE.HTTP_OK) {
            setProduct(response.data.product);
            setTotalRecord(response.data.totalRecord)
            setTotalRate(response.data.totalRate)
            }
            else if (response.data.code === CODE.HTTP_NOT_FOUND) {
                setStatus({ type: 'error', message: response.data.message });
                setShowNoti(true)
            };
        }).catch(({ response }) => {
            setStatus({ type: 'error', message: response.data ? response.data.message : 'Server error' });
            setShowNoti(true)
        });
    }, [state, page, rowsPerPage])
    useEffect(() => {
        getProduct();
    }, [state, page, rowsPerPage])

    const checkExitProduct = () => {
        const optionTemp = (Object.values(option)).sort();
        const data = Object.keys(product?.product_detail)?.map((item) => {
            let obj = {};
            obj['id'] = product?.product_detail[item].id;
            obj['option'] = Object.values(product?.product_detail[item].property_value).map(item => item.id).sort();
            obj['qty'] = qty;
            return obj;
        });
        const result = data.find(item => (item.option).toString() == optionTemp.toString() && qty <= item.qty);
        return result || null;
    }

    const handleSubmit = () => {
        const result = checkExitProduct();
        if (result) {
            addToCart(result, result.qty);
        } else {
            setStatus({ type: 'warning', message: "Option select is invalid" });
            setShowNoti(true);
        }
    }

    const SLIDE = useMemo(() => {
        const slides = [];
        if (product?.image) {
            slides.push(product?.image)
        }
        if (product?.product_media && Object.keys(product?.product_media).length > 0) {
            const images = JSON.parse(product?.product_media.url);
            images.map(item => {
                slides.push(item)
                return item;
            })
        }
        return slides;
    }, [product])

    const SALLED = useMemo(() => {
        return product?.product_detail.reduce((total, item) => total + item.sold_qty, 0)
    }, [product])

    const customPaging = (i) => {
        return (
            <a key={i}>
                <img src={BASE_URL + SLIDE[i]} />
            </a>
        );
    }

    const OPTION = useMemo(() => {
        const items = product?.product_detail;
        if (items) {
            const data = [];
            Object.values(items).map((value) => {
                Object.values(value.property_value).map((item, index2) => {
                    if (data[item?.attribute?.name] && Object.keys(data[item?.attribute?.name]).length > 0) {
                        data[item?.attribute?.name] = { ...data[item?.attribute?.name], option: [...data[item?.attribute?.name].option, { id: item.id, value: item.attribute_value_name }] }
                    } else {
                        data[item?.attribute?.name] = { id: item.attribute_id, option: [{ id: item.id, value: item.attribute_value_name }] };
                    }

                    return item;
                })
                return value;
            });
            return data;
        }
        return null;
    }, [product])

    const FORM = useMemo(() => {
        const optionTemp = OPTION;
        if (optionTemp) {
            return Object.keys(optionTemp).map((value, index) => {
                    let data = [];
                    let uniqueId = [];
                    optionTemp[value].option.forEach(element => {
                        if(!uniqueId.includes(element.id)) {
                            data.push(element);
                            uniqueId.push(element.id)
                        }
                    })
                    
                return (
                    <div className='product__option__item' key={index}>
                        <span className='product__option__item-name' data-id={optionTemp[value].id}>{value}</span>
                        <div className='product__option__list'>
  
                            {
                                Object.values(data).map((opt) => (
                                    <div className={`product__option-check ${option && Object.values(option).includes(opt.id) ? 'option-checked' : ''}`} data-id={opt.id} key={opt.id}
                                        onClick={() => {
                                            const newOptions = { ...option }
                                            if (newOptions && newOptions[optionTemp[value].id] == opt.id) {
                                                delete newOptions[optionTemp[value].id];
                                                setOption(newOptions)
                                            } else {
                                                newOptions[optionTemp[value].id] = opt.id;
                                                setOption(newOptions)
                                            }
                                        }}
                                    >
                                        {opt.value}
                                        <span className='product__option-tick'>
                                            <Check className='icon__check' />
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            })
        }
        return null;
    }, [product, OPTION, option])

    useEffect(() => {
        if (Object.keys(option).length > 0) {
            const result = checkExitProduct();
            if (result) {
                const productDetail = (product?.product_detail).filter(item => item.id == result.id);
                setCurrentOption({ ...productDetail[0] });
                setStock(productDetail[0]?.qty)
            } else {
                setStock(product?.product_detail.reduce((total, item) => total + item.qty, 0))
                setCurrentOption({});
            }
        } else {
            setStock(product?.product_detail.reduce((total, item) => total + item.qty, 0))
            setCurrentOption({});
        }
    }, [option, product])

    return <Detail
        qty={qty}
        setQty={setQty}
        product={product}
        handleChange={handleChange}
        tab={tab}
        setOption={setOption}
        option={option}
        handleSubmit={handleSubmit}
        FORM={FORM}
        stock={stock}
        SLIDE={SLIDE}
        customPaging={customPaging}
        SALLED={SALLED}
        currentOption={currentOption}
        page={page}
        setPage={setPage}
        totalRecord={totalRecord}
        rowsPerPage={rowsPerPage}
        totalRate={totalRate}
    />
};

export default DetailContainer;