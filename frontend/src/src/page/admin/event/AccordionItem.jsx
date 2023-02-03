import { Grid } from '@mui/material';
import { id } from 'date-fns/locale';
import React from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Filter from './Filter';
import LeftColumn from './LeftColumn';

const AccordionItem = (props) => {
    const {
        productList,
        item,
        setProductEventList,
        productEventList
    } = props;

    const [productSelected, setProductSelected] = useState([]);
    const [productListClone, setProductListClone] = useState([]);
    useEffect(() => {
        setProductSelected(item?.products ? item?.products.map(({ id, name }) => ({ id, name })) : [])
    }, [item, productList]);

    useEffect(() => {
        setProductListClone([...productList])
    }, [productList]);

    const addToSelectedList = useCallback((item) => {
        setProductSelected(pre => [...pre, {...item}]);
    }, []);

    const removeFromSelectedList = useCallback((item) => {
        setProductSelected(productSelected.filter(product => product.id !== item.id));
    }, [productSelected]);

    useEffect(() => {
        productEventList[item.id] = productSelected;
        setProductEventList(productEventList);
    }, [productSelected, productEventList]);

    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={5}>
                <LeftColumn
                    productSelected={productSelected}
                    productListClone={productListClone}
                    arrowLeft={true}
                    title={"Product list"}
                    addToSelectedList={addToSelectedList}
                    removeFromSelectedList={removeFromSelectedList}
                />
            </Grid>
            <Grid item xs={5}>
                <Filter
                    item={productSelected}
                    arrowLeft={false}
                    title={"Product selected"}
                    removeFromSelectedList={removeFromSelectedList}
                    addToSelectedList={addToSelectedList}
                />
            </Grid>
        </Grid>
    );
};

export default AccordionItem;