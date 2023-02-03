import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { GROUP_CATEGORY_API, HOME_API, SEARCH_API } from '../../../constants/api';
import { CODE } from '../../../constants/constants';
import { axiosClient } from '../../../hooks/useHttp';
import HomePage from './HomePage';

const HomePageContainer = ({ productItems, addToCart, CartItem, shopItems }) => {

    const [flashDelas, setFlashDelas] = useState([]);
    const [newArrivals, setNewArrivals] = useState([]);
    const [bigDiscounts, setBigDiscounts] = useState([]);
    const [ortherProduct, setOrtherProduct] = useState([]);
    const [topGroupCategory, setTopGroupCategory] = useState([]);
    const [topRateProduct, setTopRateProduct] = useState([]);
    const [brand, setBrand] = useState([]);
    const [status, setStatus] = useState({});
    const [showNoti, setShowNoti] = useState(false);

    const getApi = useCallback(() => {
        axiosClient.get(HOME_API)
            .then((response) => {
                if (response.data.code === CODE.HTTP_OK) {
                    setFlashDelas(response.data.flashDelas);
                    setNewArrivals(response.data.newArrivals);
                    setBigDiscounts(response.data.bigDiscounts);
                    setOrtherProduct(response.data.ortherProduct);
                    setTopRateProduct(response.data.topRateProduct)
                    setBrand(response.data.brand)
                }
            }).catch((response) => {
                setStatus({ type: 'error', message: response.data ? response.data.message : 'Server error' });
                setShowNoti(true)
            })
    }, []);

    const getTopCategory = useCallback(() => {
        axiosClient.get(GROUP_CATEGORY_API.TOP_GROUP_CATEGORY)
            .then((response) => {
                if (response.data.code === CODE.HTTP_OK) {
                    setTopGroupCategory(response.data.groupCategories);
                }
            }).catch((response) => {
                setStatus({ type: 'error', message: response.data ? response.data.message : 'Server error' });
                setShowNoti(true)
            })
    }, []);

    useEffect(() => {
        getApi();
        getTopCategory();
    }, [])
    return (
        <HomePage
            productItems={productItems}
            addToCart={addToCart}
            CartItem={CartItem}
            shopItems={shopItems}
            flashDelas={flashDelas}
            newArrivals={newArrivals}
            bigDiscounts={bigDiscounts}
            ortherProduct={ortherProduct}
            topRateProduct={topRateProduct}
            topGroupCategory={topGroupCategory}
            brand={brand}
            status={status}
            showNoti={showNoti}
        ></HomePage>
    );
};

export default HomePageContainer;