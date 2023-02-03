import React, { useCallback, useEffect, useState } from 'react';
import { EVENT_API, PRODUCT_API } from '../../../../constants/api';
import { CODE } from '../../../../constants/constants';
import { axiosClient } from '../../../../hooks/useHttp';
import Event from './Event';

const EventContainer = () => {
    const [eventList, setEventList] = useState([]);
    const [productEventList, setProductEventList] = useState({});
    const [productList, setProductList] = useState([]);
    const [status, setStatus] = useState({});
    const [showNoti, setShowNoti] = useState(false);
    const [loading, setLoading] = useState(false);
    const getEventList = useCallback(() => {
        axiosClient.get(EVENT_API.LIST).then((response) => {
            if (response.data.code === CODE.HTTP_OK) {
                setEventList(response?.data?.events);
            }
        }).catch((response) => {
            setStatus({ type: 'error', message: response.data ? response.data.message : 'Server error' });
            setShowNoti(true)
        });
    }, [])

    const getProductList = useCallback(() => {
        axiosClient.get(PRODUCT_API.LIST).then((response) => {
            if (response.data.code === CODE.HTTP_OK) {
                setProductList(response?.data?.products.map(({ id, name }) => ({ id, name })));
            }
        }).catch((response) => {
            setStatus({ type: 'error', message: response.data ? response.data.message : 'Server error' });
            setShowNoti(true)
        });
    }, [])

    const updateProductEvent = useCallback(() => {
        setLoading(true);
        axiosClient.put(EVENT_API.UPDATE, {
            data: productEventList
        })
            .then((response) => {
                setShowNoti(true);
                setLoading(false);
                if (response.data.code === CODE.HTTP_OK) {
                    setStatus({ type: 'success', message: response.data.message });
                }
            }).catch(({ response }) => {
                setShowNoti(true);
                setLoading(false);
                if (response.data.code === CODE.UNPROCESSABLE_ENTITY) {
                    // Object.keys(response.data.errors).forEach(element => {
                    //     setError(element, { type: 'custom', message: Object.values(response.data.errors[element]) })
                    // });
                }
                setStatus({ type: 'error', message: response.data ? response.data.message : 'Server error' });
            });
    }, [])

    useEffect(() => {
        getEventList();
        getProductList()
    }, [])
    return <Event
        eventList={eventList}
        setEventList={setEventList}
        productEventList={productEventList}
        setProductEventList={setProductEventList}
        updateProductEvent={updateProductEvent}
        productList={productList}
        loading={loading}
        showNoti={showNoti}
        status={status}
        setStatus={setStatus}
        setShowNoti={setShowNoti}
    />
};

export default EventContainer;